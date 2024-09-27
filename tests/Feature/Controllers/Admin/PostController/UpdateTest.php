<?php

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\patch;
use function PHPUnit\Framework\assertEquals;
use function PHPUnit\Framework\assertNotEquals;

beforeEach(function () {
    $this->post = Post::factory()->create(['is_published' => true]);

    $this->validData = [
        'title' => 'Post Title',
        'body' => 'Post Content',
    ];
});

it('requires authentication and admin', function () {
    patch(route('admin.posts.update', $this->post), $this->validData)
        ->assertRedirect(route('login'));

    actingAs(User::factory()->create())
        ->patch(route('admin.posts.update', $this->post), $this->validData)
        ->assertForbidden();
});

it('can update a post', function () {
    actingAs(User::factory()->create(['is_admin' => true]))
        ->patch(route('admin.posts.update', $this->post), $this->validData);

    $this->assertDatabaseHas('posts', $this->validData);
});

it('redirects to the post show page', function () {
    actingAs(User::factory()->create(['is_admin' => true]))
        ->patch(route('admin.posts.update', $this->post), $this->validData)
        ->assertRedirect($this->post->refresh()->route());
});

it('validates the data', function (array $badValues, array|string $errors) {
    actingAs(User::factory()->create(['is_admin' => true]))
        ->patch(route('admin.posts.update', $this->post), [...$this->validData, ...$badValues])
        ->assertInvalid($errors);
})->with([
    [['title' => null], 'title'],
    [['title' => 1], 'title'],
    [['title' => 1.5], 'title'],
    [['title' => false], 'title'],
    [['title' => str_repeat('a', 256)], 'title'],
    [['title' => str_repeat('a', 4)], 'title'],
    [['body' => null], 'body'],
    [['body' => 1], 'body'],
    [['body' => 1.5], 'body'],
    [['body' => false], 'body'],
]);

it('can update the posts image', function () {
    Storage::fake('images');
    $newFile = UploadedFile::fake()->image('new-image.webp');

    actingAs(User::factory()->isAdmin()->create());

    assertNotEquals($this->post->image, 'images/'.$newFile->hashName());

    patch(route('admin.posts.update', $this->post), [
        'post_image' => $newFile,
    ]);

    Storage::disk('images')->assertExists($newFile->hashName());
    assertEquals($this->post->fresh()->image, $newFile->hashName());
});

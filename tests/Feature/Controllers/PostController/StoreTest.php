<?php

use App\Models\Category;
use App\Models\Post;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\post;

beforeEach(function () {
    $this->validData = [
        'title' => 'Post Title',
        'body' => 'Post Content',
        'is_published' => true,
        'category_id' => Category::factory()->create()->id,
    ];

});

it('requires authentication and admin', function () {
    post(route('posts.store'), [])
        ->assertRedirect(route('login'));

    actingAs(User::factory()->create())
        ->post(route('posts.store'), [])
        ->assertForbidden();
});

it('can store a post', function () {
    actingAs(User::factory()->create(['is_admin' => true]))
        ->post(route('posts.store'), $this->validData);

    $this->assertDatabaseHas(Post::class, [...$this->validData]);
});

it('redirects to the post show page', function () {
    actingAs(User::factory()->create(['is_admin' => true]))
        ->post(route('posts.store'), $this->validData)
        ->assertRedirect(Post::latest('id')->first()->route());

    $this->assertDatabaseHas('posts', $this->validData);
});

it('validates the data', function (array $badValues, array|string $errors) {
    actingAs(User::factory()->create(['is_admin' => true]))
        ->post(route('posts.store'), [...$this->validData, ...$badValues])
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
    [['is_published' => null], 'is_published'],
    [['is_published' => 'not-boolean'], 'is_published'],
    [['category_id' => null], 'category_id'],
    [['category_id' => 'not-integer'], 'category_id'],
    [['category_id' => 999], 'category_id'],
]);

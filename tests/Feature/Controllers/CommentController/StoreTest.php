<?php

use App\Models\Post;
use App\Models\User;

use function Pest\Laravel\post;

beforeEach(function () {
    $this->post = Post::factory()->create();

    $this->validData = [
        'body' => 'This is a comment.',
    ];
});

it('requires authentication', function () {
    post(route('posts.comments.store', $this->post), $this->validData)
        ->assertRedirect(route('login'));
});

it('can store a comment', function () {
    $this->actingAs($user = User::factory()->create())
        ->post(route('posts.comments.store', $this->post), $this->validData)
        ->assertRedirect($this->post->route());

    $this->assertDatabaseHas('comments', [
        'post_id' => $this->post->id,
        'user_id' => $user->id,
        'body' => $this->validData,
    ]);
});

it('validates body', function ($value) {
    $this->actingAs($user = User::factory()->create())
        ->post(route('posts.comments.store', $this->post), ['body' => $value])
        ->assertInvalid('body');
})->with([
    null,
    1,
    1.5,
    false,
    str_repeat('a', 2501),
]);

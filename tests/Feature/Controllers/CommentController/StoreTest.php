<?php

use App\Models\Post;
use App\Models\User;

use function Pest\Laravel\actingAs;
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

it('can store a reply', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $comment = $this->post->comments()->create([
        'user_id' => $user->id,
        'body' => 'This is a comment.',
    ]);

    actingAs($user)
        ->post(route('posts.comments.store', $this->post), $reply = [
            'body' => 'This is a reply.',
            'reply_id' => $comment->id,
        ])
        ->assertRedirect($this->post->route());

    $this->assertDatabaseHas('comments', [
        ...$reply,
    ]);
});

it('must be verified to store a comment', function () {
    $this->actingAs(User::factory()->create(['email_verified_at' => null]))
        ->post(route('posts.comments.store', $this->post), $this->validData)
        ->assertForbidden();
});

it('validates body', function ($value) {
    $this->actingAs(User::factory()->create())
        ->post(route('posts.comments.store', $this->post), ['body' => $value])
        ->assertInvalid('body');
})->with([
    null,
    1,
    1.5,
    false,
    str_repeat('a', 2501),
]);

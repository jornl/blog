<?php

use App\Models\Post;

beforeEach(function () {
    $this->post = Post::factory()->hasComments(1)->create();
});

it('requires authentication', function () {

    $this->patch(route('comments.update', $this->post->comments->first()))
        ->assertRedirect(route('login'));
});

it('can update its own comment', function () {
    $comment = $this->post->comments->first();

    $this->actingAs($comment->user)
        ->patch(route('comments.update', $comment), [
            'body' => 'Updated comment body',
        ]);

    $this->assertDatabaseHas('comments', [
        'id' => $comment->id,
        'body' => 'Updated comment body',
    ]);
});

it('redirects back to the post after updating the comment', function () {
    $comment = $this->post->comments->first();

    $this->actingAs($comment->user)
        ->patch(route('comments.update', $comment), [
            'body' => 'Updated comment body',
        ])
        ->assertRedirect($this->post->route());
});

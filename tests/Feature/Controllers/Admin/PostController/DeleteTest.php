<?php

use App\Models\Post;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\delete;

beforeEach(function () {
    $this->post = Post::factory()->create();
});

it('requires authentication and administrator privileges', function () {
    delete(route('admin.posts.destroy', $this->post))
        ->assertRedirect(route('login'));

    actingAs(User::factory()->create())
        ->delete(route('admin.posts.destroy', $this->post))
        ->assertForbidden();
});

it('can delete a post', function () {
    actingAs(User::factory()->isAdmin()->create())
        ->delete(route('admin.posts.destroy', $this->post))
        ->assertRedirect(route('admin.posts.index'));

    $this->assertDatabaseMissing('posts', [
        'id' => $this->post->id,
    ]);
});

it('can be deleted even if it has comments', function () {
    $post = Post::factory()->hasComments()->create();

    actingAs(User::factory()->isAdmin()->create())
        ->delete(route('admin.posts.destroy', $post))
        ->assertRedirect(route('admin.posts.index'));

    $this->assertDatabaseMissing('posts', [
        'id' => $post->id,
    ]);
});

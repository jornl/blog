<?php

use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;

beforeEach(function () {
    $this->post = Post::factory()->create(['is_published' => true]);
});

it('requires authentication and admin', function () {
    get(route('posts.edit', $this->post))
        ->assertRedirect(route('login'));

    actingAs(User::factory()->create())
        ->get(route('posts.edit', $this->post))
        ->assertForbidden();
});

it('returns the correct component', function () {
    actingAs(User::factory()->create(['is_admin' => true]));

    get(route('posts.edit', $this->post))
        ->assertComponent('Posts/Edit');
});

it('passes the post to the view', function () {
    actingAs(User::factory()->create(['is_admin' => true]));

    get(route('posts.edit', $this->post))
        ->assertHasResource('post', PostResource::make($this->post->load('category')));
});

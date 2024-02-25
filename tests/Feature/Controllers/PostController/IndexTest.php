<?php

use App\Http\Resources\PostResource;
use App\Models\Post;

use function Pest\Laravel\get;

it('returns the correct component', function () {
    get(route('posts.index'))
        ->assertComponent('Posts/Index');
});

it('passes posts to the component', function () {
    $posts = Post::factory(2)->create(['is_published' => true]);

    get(route('posts.index'))
        ->assertHasPaginatedResource('posts', PostResource::collection($posts));
});

it('passes only published posts to the component', function () {
    $publishedPost = Post::factory(2)->create(['is_published' => true]);
    $unpublishedPost = Post::factory(2)->create(['is_published' => false]);

    get(route('posts.index'))
        ->assertHasPaginatedResource('posts', PostResource::collection($publishedPost))
        ->assertMissingResource('posts', PostResource::collection($unpublishedPost));
});

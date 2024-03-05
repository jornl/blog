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

    $posts->load(['category']);

    get(route('posts.index'))
        ->assertHasPaginatedResource('posts', PostResource::collection($posts->reverse()));
});

it('passes only published posts to the component', function () {
    $publishedPost = Post::factory(2)->create(['is_published' => true]);
    $unpublishedPost = Post::factory(2)->create(['is_published' => false]);

    $publishedPost->load(['category']);

    get(route('posts.index'))
        ->assertHasPaginatedResource('posts', PostResource::collection($publishedPost->reverse()))
        ->assertMissingResource('posts', PostResource::collection($unpublishedPost));
});

it('only passes posts which are within their publication window', function () {
    // Published posts
    Post::factory()->create(['is_published' => true, 'published_at' => now()]);
    Post::factory()->create(['is_published' => true, 'published_at' => now()->subDays(2), 'unpublished_at' => now()->addDays(2)]);

    // Unpublished posts
    Post::factory()->create(['is_published' => true, 'published_at' => now()->addDays(2)]);
    Post::factory()->create(['is_published' => true, 'unpublished_at' => now()->subDays(2)]);

    $publishedPost = Post::published()->get();

    expect($publishedPost)->toHaveCount(2)
        ->and(Post::all())->toHaveCount(4);
});

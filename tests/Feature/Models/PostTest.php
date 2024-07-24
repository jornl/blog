<?php

use App\Models\Post;

it('generates a route to the post', function () {
    $post = Post::factory()->create();

    expect($post->route())->toBe(route('posts.show', [$post, Str::slug($post->title)]));
});

it('generates a route to the post with additional attributes', function () {
    $post = Post::factory()->create();

    expect($post->route(attributes: ['foo' => 'bar']))->toBe(route('posts.show', [$post, Str::slug($post->title), 'foo' => 'bar']));
});

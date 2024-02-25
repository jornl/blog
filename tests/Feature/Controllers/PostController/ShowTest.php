<?php

use App\Http\Resources\CommentResource;
use App\Http\Resources\PostResource;
use App\Models\Comment;
use App\Models\Post;

use function Pest\Laravel\get;

beforeEach(function () {
    $this->post = Post::factory()->create(['is_published' => true]);
});

it('returns the correct component', function () {
    get($this->post->route())
        ->assertComponent('Posts/Show');
});

it('passes a post to the view', function () {
    get($this->post->route())
        ->assertHasResource('post', PostResource::make($this->post->load(['user', 'category'])));
});

it('cannot view an unpublished post', function () {
    $unpublishedPost = Post::factory()->create(['is_published' => false]);

    get($unpublishedPost->route())
        ->assertNotFound();
});

it('passes comments to the view', function () {
    $this->withoutExceptionHandling();
    $comments = Comment::factory(2)->for($this->post)->create();

    get($this->post->route())
        ->assertHasPaginatedResource('comments',
            CommentResource::collection($comments->load('user')->reverse())
        );
});

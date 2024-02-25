<?php

use App\Http\Resources\CategoryResource;
use App\Http\Resources\PostResource;
use App\Models\Category;

use function Pest\Laravel\get;

beforeEach(function () {
    $this->category = Category::factory()->hasPosts(2)->create();
});

it('renders the correct view', function () {
    get(route('categories.show', $this->category))
        ->assertComponent('Categories/Show');
});

it('passes the category resources to the view', function () {
    get(route('categories.show', $this->category))
        ->assertHasResource('category', CategoryResource::make($this->category));
});

it('passes the posts to the view', function () {
    $posts = $this->category->posts;

    get(route('categories.show', $this->category))
        ->assertHasPaginatedResource('posts', PostResource::collection($posts->reverse()));
});

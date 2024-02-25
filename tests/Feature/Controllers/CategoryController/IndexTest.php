<?php

use App\Http\Resources\CategoryResource;
use App\Models\Category;

use function Pest\Laravel\get;

it('renders the correct view', function () {
    get('/categories')
        ->assertComponent('Categories/Index');
});

it('passes the categories to the view', function () {
    $categories = Category::factory(2)->create();

    get('/categories')
        ->assertHasPaginatedResource('categories', CategoryResource::collection($categories));
});

<?php

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;

it('can only be accessed by users with permissions', function () {
    get(route('posts.create'))
        ->assertRedirect(route('login'));

    actingAs(User::factory()->create())
        ->get(route('posts.create'))
        ->assertForbidden();
});

it('returns the correct component', function () {
    actingAs(User::factory()->create(['is_admin' => true]));

    get(route('posts.create'))
        ->assertComponent('Posts/Create');
});

it('passes the categories to the view', function () {
    actingAs(User::factory()->create(['is_admin' => true]));

    $categories = Category::factory(2)->create();

    get(route('posts.create'))
        ->assertHasResource('categories', CategoryResource::collection($categories));
});

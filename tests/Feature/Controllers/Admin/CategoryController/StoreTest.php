<?php

use App\Models\Category;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\post;

beforeEach(function () {
    $this->validData = [
        'name' => 'Category Name',
    ];
});

it('requires authentication and administrator privileges', function () {
    post(route('admin.categories.store'), $this->validData)
        ->assertRedirect(route('login'));

    actingAs(User::factory()->create())
        ->post(route('admin.categories.store'), $this->validData)
        ->assertForbidden();
});

it('can store a category', function () {
    actingAs(User::factory()->create(['is_admin' => true]))
        ->post(route('admin.categories.store'), $this->validData);

    $this->assertDatabaseHas('categories', $this->validData);
});

it('redirects to the category page', function () {
    actingAs(User::factory()->create(['is_admin' => true]))
        ->post(route('admin.categories.store'), $this->validData)
        ->assertRedirect(route('categories.show', Category::latest('id')->first()));
});

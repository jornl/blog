<?php

use App\Models\Category;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;

beforeEach(function () {
    $this->category = Category::factory()->create();
});

it('requires authentication and administrator privileges', function () {

    get(route('categories.edit', $this->category))
        ->assertRedirect(route('login'));

    actingAs(User::factory()->create())
        ->get(route('categories.edit', $this->category))
        ->assertForbidden();
});

it('renders the correct component', function () {
    actingAs(User::factory()->isAdmin()->create())
        ->get(route('categories.edit', $this->category))
        ->assertComponent('Categories/Edit');
});

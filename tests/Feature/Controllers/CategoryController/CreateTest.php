<?php

use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;

it('requires authentication and administrator privileges', function () {
    get(route('categories.create'))
        ->assertRedirect(route('login'));

    actingAs(User::factory()->create())
        ->get(route('categories.create'))
        ->assertForbidden();
});

it('renders the correct component', function () {
    actingAs(User::factory()->isAdmin()->create())
        ->get(route('categories.create'))
        ->assertComponent('Categories/Create');
});

<?php

use App\Models\Category;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\patch;

beforeEach(function () {
    $this->category = Category::factory()->create();

    $this->validData = [
        'name' => 'Updated Category',
    ];
});

it('requires authentication and administrator privileges', function () {
    patch(route('categories.update', $this->category), $this->validData)
        ->assertRedirect(route('login'));

    actingAs(User::factory()->create())
        ->patch(route('categories.update', $this->category), $this->validData)
        ->assertForbidden();
});

it('updates the category', function () {
    actingAs(User::factory()->isAdmin()->create())
        ->patch(route('categories.update', $this->category), $this->validData)
        ->assertRedirect(route('categories.index'));

    $this->category->refresh();

    expect($this->category->name)->toBe($this->validData['name']);
    assertDatabaseHas('categories', $this->validData);
});

it('validates the input data', function ($value) {
    actingAs(User::factory()->isAdmin()->create())
        ->patch(route('categories.update', $this->category), ['name' => $value])
        ->assertInvalid('name');
})->with([
    false,
    1,
    1.5,
    str_repeat('a', 256),
    null,
]);

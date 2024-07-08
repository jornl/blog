<?php

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseMissing;
use function Pest\Laravel\delete;

it('requires authentication', function () {
    delete(route('likes.destroy', ['post', 1]))
        ->assertRedirect((route('login')));
});

it('can unlike a likeable', function (Model $model) {
    $user = User::factory()->create();

    $model->likes()->create([
        'user_id' => $user->id,
    ]);

    actingAs($user)
        ->delete(route('likes.destroy', [$model->getMorphClass(), $model->id]))
        ->assertRedirect();

    assertDatabaseMissing('likes', [
        'user_id' => $user->id,
        'likeable_id' => $model->id,
        'likeable_type' => $model->getMorphClass(),
    ]);
})->with([
    fn () => Post::factory()->create(),
    fn () => Comment::factory()->create(),
]);

it('prevents unliking models that are not liked', function () {
    $model = Post::factory()->create();

    actingAs(User::factory()->create())
        ->delete(route('likes.destroy', [$model->getMorphClass(), $model->id]))
        ->assertForbidden();
});

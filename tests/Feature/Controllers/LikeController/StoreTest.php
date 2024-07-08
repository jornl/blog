<?php

use App\Models\Comment;
use App\Models\Like;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseCount;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\post;

it('requires authentication', function () {
    post(route('likes.store', ['post', 1]))->assertRedirect((route('login')));
});

it('can like a likeable', function (Model $model) {
    $user = User::factory()->create();
    $model = $model::factory()->create();

    actingAs($user)
        ->post(route('likes.store', [$model->getMorphClass(), $model->id]))
        ->assertRedirect();

    assertDatabaseHas('likes', [
        'user_id' => $user->id,
        'likeable_id' => $model->id,
        'likeable_type' => $model->getMorphClass(),
    ]);

})->with([
    fn () => Post::factory()->create(),
    fn () => Comment::factory()->create(),
]);

it('prevents liking already liked models', function () {
    $like = Like::factory()->create();
    $likeable = $like->likeable;

    actingAs($like->user)
        ->post(route('likes.store', [$likeable->getMorphClass(), $likeable->id]))
        ->assertForbidden();

    assertDatabaseCount('likes', 1);
});

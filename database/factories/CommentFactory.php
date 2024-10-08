<?php

namespace Database\Factories;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use App\Support\CommentFixtures;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'post_id' => Post::factory(),
            'body' => fake()->realText(150),
        ];
    }

    public function withFixture(): static
    {
        return $this->sequence(...(new CommentFixtures)->getFixtures());
    }

    public function sometimesWithFixture(int $chance = 50): static
    {
        return $this->state(function (array $attributes) use ($chance) {
            return fake()->boolean($chance)
                ? (new CommentFixtures)->getFixtures()->random()
                : [];
        });
    }
}

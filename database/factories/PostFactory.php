<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Collection;

/**
 * @extends Factory<Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'title' => str(fake()->sentence)->beforeLast('.')->title(),
            'body' => Collection::times(3, fn () => fake()->realText(1000))->join(PHP_EOL.PHP_EOL),
            'is_published' => fake()->boolean(80),
            'is_featured' => fake()->boolean(10),
            'user_id' => User::factory(),
            'category_id' => Category::factory(),
        ];
    }
}

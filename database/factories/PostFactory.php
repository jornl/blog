<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use App\Support\PostFixtures;
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
        $images = [
            '/images/ai-generated-1.webp',
            '/images/ai-generated-2.webp',
            '/images/ai-generated-3.webp',
            '/images/ai-generated-4.webp',
            '/images/ai-generated-5.webp',
        ];

        return [
            'title' => str(fake()->sentence)->beforeLast('.')->title(),
            'body' => Collection::times(3, fn () => fake()->realText(1000))->join(PHP_EOL.PHP_EOL),
            'is_published' => $published = fake()->boolean(80),
            'published_at' => $published ? now() : null,
            'is_featured' => fake()->boolean(10),
            'image' => fake()->optional(0.8, null)->randomElement($images),
            'user_id' => User::factory(),
            'category_id' => Category::factory(),
        ];
    }

    public function withFixture(): static
    {
        return $this->sequence(...(new PostFixtures)->getFixtures());
    }
}

<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = [
            'Laravel',
            'PHP',
            'JavaScript',
            'React',
            'Vue',
            'Framework',
            'Tailwind CSS',
            'CSS',
            'HTML',
            'Docker',
            '.Net',
            'Python',
            'TypeScript',
        ];

        return [
            'name' => fake()->unique()->randomElement($categories),
        ];
    }
}

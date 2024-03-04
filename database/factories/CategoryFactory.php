<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
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
        ];

        return [
            'name' => fake()->unique()->randomElement($categories),
        ];
    }
}

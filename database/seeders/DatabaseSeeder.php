<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = User::factory(10)->create();
        $categories = Category::factory(10)->create();

        $author = User::factory()
            ->isAdmin()
            ->create([
                'name' => 'Test User',
                'email' => 'test@example.com',
            ]);

        $posts = Post::factory(50)->recycle($categories)->create(['user_id' => $author->id]);

        Comment::factory(50)->recycle($posts)->create(['user_id' => $author->id]);

        Comment::factory(50)->recycle([$users, $posts])->create();
    }
}

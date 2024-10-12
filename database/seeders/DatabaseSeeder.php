<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Like;
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

        $posts = Post::factory(50)
            ->withFixture()
            ->recycle($categories)
            ->has($comments = Comment::factory(3)->sometimesWithFixture()->recycle($users))
            ->has(Comment::factory(2)->sometimesWithFixture()->for($author))
            ->create(['user_id' => $author->id]);

        Like::factory(200)
            ->recycle($posts, $users)
            ->create();

        Like::factory(30)->recycle($posts, $author)->create();
    }
}

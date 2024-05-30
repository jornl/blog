<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\CommentResource;
use App\Http\Resources\PostResource;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        if (! $request->user()->is_admin) {
            abort(403);
        }

        $categories = CategoryResource::collection(Category::withCount('posts')->get());
        $posts = PostResource::collection(
            Post::published()
                ->trending()
                ->with(['category', 'comments'])
                ->paginate(5)
        );
        $comments = CommentResource::collection(
            Comment::with(['post', 'user'])
                ->latest()
                ->paginate(5)
        );

        return inertia('Dashboard', [
            'categories' => $categories,
            'posts' => $posts,
            'comments' => $comments,
        ]);
    }
}

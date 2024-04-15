<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;

class SplashPageController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $posts = Post::trending()->limit(3)->get();

        return inertia('Home', [
            'posts' => PostResource::collection($posts),
        ]);
    }
}

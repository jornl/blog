<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommentResource;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PostController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Post::class);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::with(['category'])
            ->published()
            ->latest()
            ->paginate(10);

        return inertia('Posts/Index', [
            'posts' => PostResource::collection($posts),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post, Request $request)
    {
        if (! Str::endsWith($post->route(), $request->path())) {
            return redirect($post->route($request->query()), status: 301);
        }

        $comments = $post
            ->comments()
            ->with('replies', 'replies.user')
            ->withCount('replies')
            ->latest()
            ->latest('id')
            ->paginate(10);

        $categoryPosts = $post->category
            ->posts()
            ->where('id', '!=', $post->id)
            ->published()
            ->trending()
            ->limit(3)
            ->get();

        return inertia('Posts/Show', [
            'post' => PostResource::make($post->load(['user', 'category'])->loadCount(['likes', 'comments'])),
            'comments' => CommentResource::collection($comments),
            'categoryPosts' => PostResource::collection($categoryPosts),
        ]);
    }
}

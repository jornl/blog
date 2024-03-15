<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\CommentResource;
use App\Http\Resources\PostResource;
use App\Models\Category;
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
            ->featured()
            ->paginate(10);

        return inertia('Posts/Index', [
            'posts' => PostResource::collection($posts),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Posts/Create', [
            'categories' => CategoryResource::collection(Category::all()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $attributes = $request->validate([
            'title' => ['required', 'string', 'max:255', 'min:5'],
            'excerpt' => ['nullable', 'string'],
            'body' => ['required', 'string'],
            'image' => ['nullable', 'string'],
            'published_at' => ['nullable', 'date'],
            'is_published' => ['required', 'boolean'],
            'category_id' => ['required', 'exists:categories,id'],
        ]);

        $post = Post::create([
            ...$attributes,
            'user_id' => auth()->user()->id,
        ]);

        return redirect($post->route());
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post, Request $request)
    {
        if (! Str::contains($post->route(), $request->path())) {
            return redirect($post->route($request->query()), status: 301);
        }

        return inertia('Posts/Show', [
            'post' => PostResource::make($post->load(['user', 'category'])),
            'comments' => CommentResource::collection($post
                ->comments()
                ->with(['user', 'replies', 'replies.user'])
                ->latest()
                ->latest('id')
                ->paginate(10)),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        return inertia('Posts/Edit', [
            'post' => PostResource::make($post->load('category')),
            'categories' => CategoryResource::collection(Category::all()),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $attributes = $request->validate([
            'title' => ['sometimes', 'required', 'string', 'max:255', 'min:5'],
            'excerpt' => ['nullable', 'string'],
            'body' => ['sometimes', 'required', 'string'],
            'image' => ['nullable', 'string'],
            'published_at' => ['nullable', 'date'],
            'is_published' => ['sometimes', 'required', 'boolean'],
            'category_id' => ['sometimes', 'required', 'exists:categories,id'],
        ]);

        $post->update($attributes);

        return redirect($post->route());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();

        return redirect(route('posts.index'));
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\PostResource;
use App\Http\Sorters\PostSorter;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Authorize the resource controller.
     */
    public function __construct()
    {
        $this->authorizeResource(Post::class);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(PostSorter $filters, Request $request)
    {
        $posts = Post::with(['category'])
            ->withCount(['comments', 'likes'])
            ->when($request->has('sort'), fn ($query) => $query->filter($filters), fn ($query) => $query->latest())
            ->paginate(10);

        return inertia('Admin/Posts/Index', [
            'posts' => PostResource::collection($posts),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Admin/Posts/Create', [
            'post' => new Post,
            'categories' => fn () => CategoryResource::collection(Category::all()),
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
            'body' => ['required', 'string', 'min:50'],
            'post_image' => ['nullable', 'image'],
            'is_published' => ['sometimes', 'required', 'boolean'],
            'published_at' => ['nullable', 'date'],
            'unpublished_at' => ['nullable', 'date'],
            'category_id' => ['required', 'exists:categories,id'],
        ]);

        $attributes['is_published'] = $attributes['is_published'] ?? false;

        unset($attributes['post_image']);

        if ($request->file('post_image')) {
            $attributes['image'] = $request->file('post_image')->store('images');
        }

        $post = Post::create([
            ...$attributes,
            'user_id' => auth()->user()->id,
        ]);

        return redirect($post->route());
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        return inertia('Admin/Posts/Edit', [
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
            'post_image' => ['sometimes', 'image'],
            'is_published' => ['sometimes', 'required', 'boolean'],
            'published_at' => ['nullable', 'date'],
            'unpublished_at' => ['nullable', 'date'],
            'category_id' => ['sometimes', 'required', 'exists:categories,id'],
        ]);

        unset($attributes['post_image']);

        if ($request->file('post_image')) {
            $attributes['image'] = $request->file('post_image')->store('images');
        }

        $post->update($attributes);

        return redirect($post->route());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();

        return redirect(route('admin.posts.index'));
    }
}

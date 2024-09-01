<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\PostResource;
use App\Models\Category;

class CategoryController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Category::class);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::paginate();

        return inertia('Categories/Index', [
            'categories' => CategoryResource::collection($categories),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return inertia('Categories/Show', [
            'category' => CategoryResource::make($category),
            'posts' => PostResource::collection($category->posts()->latest()->latest('id')->paginate()),
        ]);
    }
}

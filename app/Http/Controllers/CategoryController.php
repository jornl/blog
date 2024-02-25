<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\PostResource;
use App\Models\Category;
use Illuminate\Http\Request;

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
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Categories/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $category = Category::create($request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]));

        return to_route('categories.show', $category);
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

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return inertia('Categories/Edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $attributes = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $category->update($attributes);

        return to_route('categories.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
    }
}

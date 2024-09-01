<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Category::class);
    }

    public function index()
    {
        $categories = Category::paginate();

        return inertia('Admin/Categories/Index', [
            'categories' => CategoryResource::collection($categories),
        ]);
    }

    public function show(Category $category)
    {
        return inertia('Admin/Categories/Show', [
            'category' => CategoryResource::make($category),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Admin/Categories/Create');
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
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return inertia('Admin/Categories/Edit', [
            'category' => CategoryResource::make($category),
        ]);
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

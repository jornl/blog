<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Category;

class CategoryController extends Controller
{
    public function show(Category $category)
    {
        return inertia('Admin/Categories/Show', [
            'category' => CategoryResource::make($category),
        ]);
    }
}

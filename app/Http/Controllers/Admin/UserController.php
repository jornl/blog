<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $users = User::withCount('likes', 'comments')
            ->paginate();

        return inertia('Admin/Users/Index', [
            'users' => UserResource::collection($users),
        ]);
    }
}

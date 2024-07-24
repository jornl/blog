<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Post $post, Request $request)
    {
        $this->authorize('create', Comment::class);

        $attributes = $request->validate([
            'body' => ['required', 'string', 'max:2500'],
            'reply_id' => ['sometimes', 'required', 'nullable', 'exists:comments,id'],
        ]);

        $post->comments()->create([
            'user_id' => $request->user()->id,
            ...$attributes,
        ]);

        return redirect($post->route());
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        $this->authorize('update', $comment);

        $attributes = $request->validate([
            'body' => ['required', 'string', 'max:2500'],
        ]);

        $comment->update($attributes);

        return redirect($comment->post->route());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        //
    }
}

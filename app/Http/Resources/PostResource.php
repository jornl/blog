<?php

namespace App\Http\Resources;

use App\Models\Like;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'excerpt' => $this->when($this->excerpt, $this->excerpt),
            'body' => $this->body,
            'html' => $this->html,
            'image' => $this->image,
            'published_at' => $this->published_at,
            'unpublished_at' => $this->unpublished_at,
            'is_published' => $this->is_published,
            'is_featured' => $this->is_featured,
            'user' => $this->whenLoaded('user', fn () => UserResource::make($this->user)),
            'comments' => $this->whenLoaded('comments', fn () => CommentResource::collection($this->comments)),
            'comments_count' => $this->whenCounted('comments'),
            'likes_count' => $this->whenCounted('likes'),
            'category' => $this->whenLoaded('category', fn () => CategoryResource::make($this->category)),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'routes' => [
                'show' => $this->route(),
                'edit' => $this->when($request->user()?->isAdmin(), $this->route('admin.posts.edit', false)),
            ],
            'can' => [
                'like' => $request->user()?->can('create', [Like::class, $this->resource]),
            ],
        ];
    }
}

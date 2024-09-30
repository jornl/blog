<?php

namespace App\Http\Resources;

use App\Http\Resources\Concerns\WithLikePermissions;
use App\Models\Like;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    use WithLikePermissions;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user' => $this->whenLoaded('user', fn () => UserResource::make($this->user)),
            'post' => $this->whenLoaded('post', fn () => PostResource::make($this->post)),
            'post_id' => $this->post_id,
            'replies' => $this->whenLoaded('replies', fn () => CommentResource::collection($this->replies)),
            'replies_count' => $this->whenCounted('replies'),
            'reply_id' => $this->reply_id,
            'body' => $this->body,
            'html' => $this->html,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'can' => [
                'like' => $this->when($this->withLikePermissions, fn () => $request->user()?->can('create', [Like::class, $this->resource])),
            ],
        ];
    }
}

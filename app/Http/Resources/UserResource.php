<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->when($this->id === $request->user()?->id, $this->email),
            'email_verified_at' => $this->email_verified_at,
            'is_admin' => $this->is_admin,
            'posts' => $this->whenLoaded('posts', fn () => PostResource::collection($this->posts)),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}

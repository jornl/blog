<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class LikePolicy
{
    /**
     * Determine whether the user can create models.
     */
    public function create(User $user, Model $likeable): bool
    {
        if ($likeable->relationLoaded('likes')) {
            return $likeable->likes->where('user_id', $user->id)->isEmpty();
        }

        return $likeable->likes()->where('user_id', $user->id)->doesntExist();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Model $likeable): bool
    {
        if ($likeable->relationLoaded('likes')) {
            return $likeable->likes->where('user_id', $user->id)->isNotEmpty();
        }

        return $likeable->likes()->where('user_id', $user->id)->exists();
    }
}

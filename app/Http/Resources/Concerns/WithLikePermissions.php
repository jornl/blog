<?php

namespace App\Http\Resources\Concerns;

trait WithLikePermissions {
    
    /**
     * Whether to include like permissions in the resource.
     */
    protected bool $withLikePermissions = false;

    /**
     * Include like permissions in the resource.
     */
    public function withLikePermissions(): self
    {
        $this->withLikePermissions = true;

        return $this;
    }
}

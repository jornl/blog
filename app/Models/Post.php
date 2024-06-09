<?php

namespace App\Models;

use App\Models\Concerns\ConvertsMarkdownToHtml;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Post extends Model
{
    use ConvertsMarkdownToHtml, HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'title',
        'excerpt',
        'body',
        'html',
        'image',
        'published_at',
        'unpublished_at',
        'is_published',
        'is_featured',
        'user_id',
        'category_id',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'published_at' => 'datetime',
        'is_published' => 'boolean',
        'is_featured' => 'boolean',
    ];

    /**
     * Get the user that owns the Post
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the category that the post belongs to.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the comments for the blog post.
     */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Return the route to the post.
     */
    public function route(string $route = 'posts.show', array $attributes = []): string
    {
        return route($route, [$this, Str::slug($this->title), ...$attributes]);
    }

    /**
     * Scope a query to only include published posts.
     */
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true)
            ->where(function (Builder $query) {
                $query->whereNull('published_at')
                    ->orWhere('published_at', '<=', now());
            })
            ->where(function (Builder $query) {
                $query->whereNull('unpublished_at')
                    ->orWhere('unpublished_at', '>', now());
            });
    }

    /**
     * Scope a query to order by featured posts.
     */
    public function scopeFeatured(Builder $query): Builder
    {
        return $query->orderByDesc('is_featured')
            ->orderByDesc('published_at')
            ->orderByDesc('created_at')
            ->orderByDesc('id');
    }

    /**
     * Scope a query to order by trending posts.
     */
    public function scopeTrending(Builder $query): Builder
    {
        return $query->withCount('comments')
            ->orderByDesc('comments_count')
            ->orderByDesc('created_at');
    }
}

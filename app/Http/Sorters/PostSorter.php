<?php

namespace App\Http\Sorters;

class PostSorter extends QuerySorter
{
    protected array $sortable = [
        'title',
        'comments_count',
        'published_at',
        'created_at',
        'updated_at',
    ];
}

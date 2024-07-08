<?php

namespace App\Http\Sorters;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

abstract class QuerySorter
{
    protected array $sortable = [];

    protected Builder $builder;

    protected Request $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * Apply the filters to the builder.
     */
    public function apply($builder): Builder
    {
        $this->builder = $builder;

        foreach ($this->request->all() as $key => $value) {
            if (method_exists($this, $key)) {
                $this->$key($value);
            }
        }

        return $this->builder;
    }

    /**
     * Sort the collection by the given value.
     */
    public function sort($value): void
    {
        $sortAttributes = explode(',', $value);

        foreach ($sortAttributes as $attribute) {
            $direction = 'asc';

            if (str_starts_with($attribute, '-')) {
                $direction = 'desc';
                $attribute = substr($attribute, 1);
            }

            if (! in_array($attribute, $this->sortable) && ! array_key_exists($attribute, $this->sortable)) {
                continue;
            }

            $columnName = $this->sortable[$attribute] ?? $attribute;
            $this->builder->orderBy($columnName, $direction);
        }

    }
}

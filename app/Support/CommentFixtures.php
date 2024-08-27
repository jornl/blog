<?php

namespace App\Support;

use Illuminate\Support\Collection;

class CommentFixtures extends Fixtures
{
    public string $path = 'factories/fixtures/comments';

    protected function fields(Collection $parts): array
    {
        return [
            'body' => str($parts->implode("\n"))->trim(),
        ];
    }
}

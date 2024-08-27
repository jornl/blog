<?php

namespace App\Support;

use Illuminate\Support\Collection;

class PostFixtures extends Fixtures
{
    public string $path = 'factories/fixtures/posts';

    protected function fields(Collection $parts): array
    {
        return [
            'title' => str($parts[0])->trim()->after('# '),
            'body' => str($parts[1])->trim(),
        ];
    }
}

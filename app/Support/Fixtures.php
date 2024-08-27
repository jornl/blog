<?php

namespace App\Support;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\File;
use Symfony\Component\Finder\SplFileInfo;

abstract class Fixtures
{
    public string $path;

    public function getFixtures(): Collection
    {
        return collect(File::files(database_path($this->path)))
            ->map(fn (SplFileInfo $fileInfo) => $fileInfo->getContents())
            ->map(fn (string $contents) => str($contents)->explode("\n", 2))
            ->map(fn (Collection $parts) => $this->fields($parts));
    }

    abstract protected function fields(Collection $parts): array;
}

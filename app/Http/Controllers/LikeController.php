<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    /**
     * Like a model.
     */
    public function store(Request $request, string $type, int $id): RedirectResponse
    {
        $likeable = $this->likeable($type, $id);
        $this->authorize('create', [Like::class, $likeable]);

        $likeable->likes()
            ->create([
                'user_id' => $request->user()->id,
            ]);

        return back();
    }

    /**
     * Unlike a model.
     */
    public function destroy(Request $request, string $type, int $id): RedirectResponse
    {
        $likeable = $this->likeable($type, $id);
        $this->authorize('delete', [Like::class, $likeable]);

        $likeable->likes()
            ->whereBelongsTo($request->user())
            ->delete();

        return back();
    }

    protected function likeable(string $type, int $id): Model
    {
        /** @var class-string<Model>|null $modelName */
        $modelName = Relation::getMorphedModel($type);

        return $modelName::findOrFail($id);
    }
}

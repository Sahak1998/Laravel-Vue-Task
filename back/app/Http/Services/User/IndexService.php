<?php

namespace App\Http\Services\User;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class IndexService
{
    public function __invoke($data): LengthAwarePaginator
    {
        $perPage = $data['per_page'] ?? 10;
        $page = $data['page'] ?? 1;

        return User::query()
            ->when($data['lastName'] ?? null, fn($q) => $q->where('lastName', 'like', '%' . $data['lastName'] . '%'))
            ->when($data['firstName'] ?? null, fn($q) => $q->where('firstName', 'like', '%' . $data['firstName'] . '%'))
            ->when($data['dateOfBirth'] ?? null, fn($q) => $q->where('dateOfBirth', $data['dateOfBirth']))
            ->when($data['country'] ?? null, fn($q) => $q->where('country', 'like', '%' . $data['country'] . '%'))
            ->when($data['profession'] ?? null, fn($q) => $q->where('profession', 'like', '%' . $data['profession'] . '%'))
            ->when($data['yearsInProfession'] ?? null, fn($q) => $q->where('yearsInProfession', $data['yearsInProfession']))
            ->paginate($perPage, ['*'],  $page);
    }
}

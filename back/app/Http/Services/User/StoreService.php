<?php

namespace App\Http\Services\User;

use App\Models\User;

class StoreService
{
    public function __invoke($data)
    {
        return User::create($data);
    }
}

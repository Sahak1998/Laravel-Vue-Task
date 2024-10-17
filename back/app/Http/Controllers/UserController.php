<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\IndexRequest;
use App\Http\Requests\User\StoreRequest;
use App\Http\Requests\User\UpdateRequest;
use App\Http\Resources\User\IndexResourceCollection;
use App\Http\Resources\User\ShowResource;
use App\Http\Resources\User\StoreResource;
use App\Http\Services\User\IndexService;
use App\Http\Services\User\StoreService;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(IndexRequest $IndexRequest, IndexService $indexService): IndexResourceCollection
    {
        $response = $indexService($IndexRequest->validated());
        return (new IndexResourceCollection($response));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $storeRequest, StoreService $storeService): JsonResponse
    {
        $response = $storeService($storeRequest->validated());
        $messages = __('user.user.store');
        return (new StoreResource($response))
            ->additional(compact('messages'))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user): ShowResource
    {
        return (new ShowResource($user));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $updateRequest, User $user): Response
    {
        $user->update($updateRequest->validated());
        return response()->noContent();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user): JsonResponse
    {
        $user->delete();
        $message = __('user.user.destroy');
        return response()->json(compact('message'));
    }
}

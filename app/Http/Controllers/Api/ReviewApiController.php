<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\JsonResponse;

class ReviewApiController extends Controller
{
    public function index(): JsonResponse
    {
        $reviews = Review::published()
            ->with('product:id,name')
            ->latest()
            ->limit(6)
            ->get();

        return response()->json($reviews);
    }
}
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\JsonResponse;

class CategoryApiController extends Controller
{
    public function index(): JsonResponse
    {
        $categories = Category::active()
            ->ordered()
            ->withCount('activeProducts')
            ->get();

        return response()->json($categories);
    }

    public function show(Category $category): JsonResponse
    {
        $category->load(['activeProducts' => fn($q) => $q->orderBy('sort_order')]);

        return response()->json($category);
    }
}
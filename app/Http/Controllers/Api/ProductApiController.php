<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProductApiController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Product::with('category')->active();

        if ($request->has('category')) {
            $query->whereHas('category', fn($q) => $q->where('slug', $request->category));
        }

        if ($request->has('popular')) {
            $query->popular();
        }

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $products = $query->orderBy('sort_order')->paginate($request->per_page ?? 12);

        return response()->json($products);
    }

    public function show(Product $product): JsonResponse
    {
        $product->load(['category', 'reviews' => fn($q) => $q->published()]);

        return response()->json($product);
    }

    public function popular(): JsonResponse
    {
        $products = Product::active()->popular()
            ->with('category')
            ->orderBy('sort_order')
            ->limit(8)
            ->get();

        return response()->json($products);
    }
}
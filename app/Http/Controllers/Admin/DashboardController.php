<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\Category;
use App\Models\Review;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function stats(): JsonResponse
    {
        return response()->json([
            'total_products' => Product::count(),
            'active_products' => Product::active()->count(),
            'total_categories' => Category::count(),
            'total_orders' => Order::count(),
            'new_orders' => Order::where('status', 'new')->count(),
            'total_revenue' => Order::where('status', 'delivered')->sum('total'),
            'today_orders' => Order::whereDate('created_at', today())->count(),
            'today_revenue' => Order::whereDate('created_at', today())
                ->where('status', 'delivered')
                ->sum('total'),
            'total_reviews' => Review::count(),
            'recent_orders' => Order::with('items')
                ->latest()
                ->limit(5)
                ->get(),
        ]);
    }
}
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Order::with('items');

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $orders = $query->latest()->paginate(15);

        return response()->json($orders);
    }

    public function show(Order $order): JsonResponse
    {
        return response()->json($order->load('items.product'));
    }

    public function updateStatus(UpdateOrderRequest $request, Order $order): JsonResponse
    {
        $request->validate([
            'status' => 'required|in:new,confirmed,preparing,delivering,delivered,cancelled',
        ]);

        $order->update([
            'status' => $request->status,
            'delivered_at' => $request->status === 'delivered' ? now() : $order->delivered_at,
        ]);

        return response()->json($order);
    }
}
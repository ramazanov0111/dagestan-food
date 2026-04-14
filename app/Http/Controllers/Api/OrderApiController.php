<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrderRequest;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\JsonResponse;

class OrderApiController extends Controller
{
    public function store(StoreOrderRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $items = collect($validated['items']);

        $productIds = $items->pluck('product_id');
        $products = Product::whereIn('id', $productIds)->get()->keyBy('id');

        $subtotal = 0;
        $orderItems = [];

        foreach ($items as $item) {
            $product = $products[$item['product_id']];
            $total = $product->price * $item['quantity'];
            $subtotal += $total;

            $orderItems[] = [
                'product_id' => $product->id,
                'product_name' => $product->name,
                'price' => $product->price,
                'quantity' => $item['quantity'],
                'total' => $total,
            ];
        }

        $deliveryFee = $subtotal >= 2000 ? 0 : 200;

        $order = Order::create([
            'order_number' => Order::generateOrderNumber(),
            'customer_name' => $validated['customer_name'],
            'customer_phone' => $validated['customer_phone'],
            'customer_email' => $validated['customer_email'] ?? null,
            'delivery_address' => $validated['delivery_address'],
            'comment' => $validated['comment'] ?? null,
            'payment_method' => $validated['payment_method'],
            'subtotal' => $subtotal,
            'delivery_fee' => $deliveryFee,
            'total' => $subtotal + $deliveryFee,
        ]);

        $order->items()->createMany($orderItems);

        return response()->json([
            'success' => true,
            'order_number' => $order->order_number,
            'total' => $order->total,
            'message' => 'Заказ успешно создан!',
        ], 201);
    }

    public function show(string $orderNumber): JsonResponse
    {
        $order = Order::where('order_number', $orderNumber)
            ->with('items')
            ->firstOrFail();

        return response()->json($order);
    }
}
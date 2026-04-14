<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductApiController;
use App\Http\Controllers\Api\CategoryApiController;
use App\Http\Controllers\Api\OrderApiController;
use App\Http\Controllers\Api\ReviewApiController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\OrderController;

// Public API
Route::prefix('v1')->group(function () {
    Route::get('categories', [CategoryApiController::class, 'index']);
    Route::get('categories/{category:slug}', [CategoryApiController::class, 'show']);

    Route::get('products', [ProductApiController::class, 'index']);
    Route::get('products/popular', [ProductApiController::class, 'popular']);
    Route::get('products/{product:slug}', [ProductApiController::class, 'show']);

    Route::post('orders', [OrderApiController::class, 'store']);
    Route::get('orders/{orderNumber}', [OrderApiController::class, 'show']);

    Route::get('reviews', [ReviewApiController::class, 'index']);
});

// Admin API
Route::prefix('admin')
// ->middleware(['auth:sanctum', 'admin'])
->group(function () {
    Route::get('dashboard/stats', [DashboardController::class, 'stats']);

    Route::apiResource('products', ProductController::class);
    Route::patch('products/{product}/toggle-active', [ProductController::class, 'toggleActive']);
    Route::patch('products/{product}/toggle-popular', [ProductController::class, 'togglePopular']);

    Route::apiResource('categories', CategoryController::class);

    Route::get('orders', [OrderController::class, 'index']);
    Route::get('orders/{order}', [OrderController::class, 'show']);
    Route::patch('orders/{order}/status', [OrderController::class, 'updateStatus']);
});
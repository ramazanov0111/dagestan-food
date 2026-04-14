<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_number', 'customer_name', 'customer_phone', 'customer_email',
        'delivery_address', 'comment', 'status', 'payment_method',
        'subtotal', 'delivery_fee', 'total', 'delivered_at',
    ];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'delivery_fee' => 'decimal:2',
        'total' => 'decimal:2',
        'delivered_at' => 'datetime',
    ];

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public static function generateOrderNumber(): string
    {
        return 'DG-' . date('Ymd') . '-' . strtoupper(substr(uniqid(), -5));
    }

    public function getStatusLabelAttribute(): string
    {
        return match ($this->status) {
            'new' => 'Новый',
            'confirmed' => 'Подтверждён',
            'preparing' => 'Готовится',
            'delivering' => 'Доставляется',
            'delivered' => 'Доставлен',
            'cancelled' => 'Отменён',
            default => $this->status,
        };
    }

    public function getStatusColorAttribute(): string
    {
        return match ($this->status) {
            'new' => 'blue',
            'confirmed' => 'indigo',
            'preparing' => 'yellow',
            'delivering' => 'orange',
            'delivered' => 'green',
            'cancelled' => 'red',
            default => 'gray',
        };
    }
}
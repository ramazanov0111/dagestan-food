<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // Простая проверка — замени на свою логику (Roles/Permissions)
        if (!auth()->check() || !auth()->user()->is_admin) {
            abort(403, 'Доступ запрещён');
        }

        return $next($request);
    }
}
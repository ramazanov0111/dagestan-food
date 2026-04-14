<?php

namespace App\Http\Controllers; // Пространство имен

use Illuminate\Foundation\Auth\Access\AuthorizesRequests; // Трейт для авторизации
use Illuminate\Foundation\Validation\ValidatesRequests; // Трейт для валидации
use Illuminate\Routing\Controller as BaseController; // Наследование базового класса

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
    
    // Здесь обычно определяются общие методы для всех контроллеров
}

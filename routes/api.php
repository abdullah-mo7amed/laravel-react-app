<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CartController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request)
{
  return $request->user();
});


Route::get('/categories', [App\Http\Controllers\CategoryController::class, 'index']);
Route::get('/products', [App\Http\Controllers\ProductController::class, 'index']);
Route::middleware('auth:sanctum')->post('/cart/add', [CartController::class, 'addToCart']);
Route::middleware('auth:sanctum')->get('/cart', [CartController::class, 'getCartItems']);
Route::middleware('auth:sanctum')->post('/cart/update', [CartController::class, 'updateCartItem']);
Route::middleware('auth:sanctum')->post('/cart/remove', [CartController::class, 'removeCartItem']);
Route::middleware('auth:sanctum')->post('/place-order', [App\Http\Controllers\OrderController::class, 'placeOrder']);

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
  ->middleware('guest')
  ->name('login');

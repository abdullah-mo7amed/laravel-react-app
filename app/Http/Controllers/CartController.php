<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\CartItem;
use Illuminate\Http\Request;

class CartController extends Controller
{
  public function addToCart(Request $request)
  {
    $request->validate([
      'product_id' => 'required|exists:products,id',
      'quantity' => 'required|integer|min:1',
    ]);
    $user = $request->user();
    if (!$user)
    {
      return response()->json(['message' => 'Unauthorized'], 401);
    }
    $product = Product::findOrFail($request->product_id);
    if ($request->quantity > $product->stock)
    {
      return response()->json(['message' => 'Not enough stock'], 422);
    }
    $cartItem = $user->cartItems()->updateOrCreate(
      ['product_id' => $product->id],
      ['quantity' => min($request->quantity, $product->stock)]
    );
    return response()->json(['message' => 'Added to cart', 'cart_item' => $cartItem]);
  }

  public function getCartItems(Request $request)
  {
    $user = $request->user();
    if (!$user)
    {
      return response()->json(['message' => 'Unauthorized'], 401);
    }
    $cartItems = $user->cartItems()->with('product')->get();
    $items = $cartItems->map(function ($item)
    {
      return [
        'id' => $item->id,
        'product_id' => $item->product_id,
        'name' => $item->product->name ?? '',
        'cover' => $item->product->cover ?? null,
        'price' => $item->product->price ?? 0,
        'quantity' => $item->quantity,
        'stock' => $item->product->stock ?? 0,
      ];
    });
    return response()->json(['data' => $items]);
  }

  public function updateCartItem(Request $request)
  {
    $request->validate([
      'id' => 'required|exists:cart_items,id',
      'quantity' => 'required|integer|min:1',
    ]);
    $user = $request->user();
    $cartItem = $user->cartItems()->where('id', $request->id)->first();
    if (!$cartItem)
    {
      return response()->json(['message' => 'Not found'], 404);
    }
    $product = $cartItem->product;
    if ($request->quantity > $product->stock)
    {
      return response()->json(['message' => 'Not enough stock'], 422);
    }
    $cartItem->quantity = $request->quantity;
    $cartItem->save();
    return response()->json(['message' => 'Cart updated', 'cart_item' => $cartItem]);
  }

  public function removeCartItem(Request $request)
  {
    $request->validate([
      'id' => 'required|exists:cart_items,id',
    ]);
    $user = $request->user();
    $cartItem = $user->cartItems()->where('id', $request->id)->first();
    if ($cartItem)
    {
      $cartItem->delete();
    }
    return response()->json(['message' => 'Cart item removed']);
  }
}

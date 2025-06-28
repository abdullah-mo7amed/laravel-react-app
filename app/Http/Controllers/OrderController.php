<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Jobs\SendOrderThankYouEmail;

class OrderController extends Controller
{
  public function placeOrder(Request $request)
  {
    $user = $request->user();
    if (!$user)
    {
      return response()->json(['message' => 'Unauthorized'], 401);
    }


    SendOrderThankYouEmail::dispatch($user);

    $user->cartItems()->delete();
    return response()->json(['message' => 'Order placed and email will be sent!']);
  }
}

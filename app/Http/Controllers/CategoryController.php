<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
  public function index()
  {
    $categories = Category::get()->map(function ($category)
    {
      return [
        'product_count' => $category->products()->count(),
        ...$category->toArray()
      ];
    });

    return response()->json([
      'message' => 'success',
      'data' => $categories
    ]);
  }
}

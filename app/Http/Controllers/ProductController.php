<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ProductController extends Controller
{
  public function index(Request $request)
  {
    // Generate cache key based on filters and pagination
    $cacheKey = 'products:' . md5(json_encode($request->all()));

    $products = Cache::remember($cacheKey, now()->addMinutes(10), function () use ($request)
    {
      $query = Product::query();

      // Search by name
      if ($request->filled('search'))
      {
        $query->where('name', 'like', '%' . $request->search . '%');
      }

      // Filter by price range
      if ($request->filled('min_price'))
      {
        $query->where('price', '>=', $request->min_price);
      }

      if ($request->filled('max_price'))
      {
        $query->where('price', '<=', $request->max_price);
      }

      // Filter by category
      if ($request->filled('category'))
      {
        $query->with('category')->whereHas('category', function ($query) use ($request)
        {
          $query->where('name', 'like', '%' . $request->category . '%');
        });
      }

      // Pagination (10 per page)
      return $query->with('category')->orderBy('created_at', 'desc')->paginate(10)->through(function ($product)
      {
        return array_merge(
          $product->toArray(),
          [
            'category' => $product->category ? $product->category->name : null,
          ]
        );
      });
    });

    return response()->json($products);
  }
}

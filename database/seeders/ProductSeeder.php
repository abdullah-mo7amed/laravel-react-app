<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;

class ProductSeeder extends Seeder
{
  public function run()
  {
    $products = [
      [
        'name' => 'Wireless Headphones',
        'cover' => 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?fit=crop&w=600&q=80',
        'description' => 'High-quality wireless headphones with noise cancellation.',
        'price' => 99.99,
        'category' => 'Electronics',
        'stock' => 10,
      ],
      [
        'name' => 'Smart Watch',
        'cover' => 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?fit=crop&w=600&q=80',
        'description' => 'Feature-rich smartwatch with health monitoring.',
        'price' => 199.99,
        'category' => 'Electronics',
        'stock' => 8,
      ],
      [
        'name' => 'Laptop Backpack',
        'cover' => 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?fit=crop&w=600&q=80',
        'description' => 'Durable laptop backpack with multiple compartments.',
        'price' => 49.99,
        'category' => 'Fashion',
        'stock' => 15,
      ],
      [
        'name' => 'Bluetooth Speaker',
        'cover' => 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?fit=crop&w=600&q=80',
        'description' => 'Portable Bluetooth speaker with excellent sound quality.',
        'price' => 79.99,
        'category' => 'Electronics',
        'stock' => 12,
      ],
      [
        'name' => 'Gaming Mouse',
        'cover' => 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?fit=crop&w=600&q=80',
        'description' => 'High-precision gaming mouse with RGB lighting.',
        'price' => 59.99,
        'category' => 'Electronics',
        'stock' => 20,
      ],
      [
        'name' => 'Phone Case',
        'cover' => 'https://images.unsplash.com/photo-1512499617640-c2f999098c67?fit=crop&w=600&q=80',
        'description' => 'Protective phone case with elegant design.',
        'price' => 19.99,
        'category' => 'Fashion',
        'stock' => 30,
      ],
      [
        'name' => 'Garden Tools Set',
        'cover' => 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=600&q=80',
        'description' => 'Complete set of garden tools for home use.',
        'price' => 39.99,
        'category' => 'Home & Garden',
        'stock' => 7,
      ],
      [
        'name' => 'Yoga Mat',
        'cover' => 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?fit=crop&w=600&q=80',
        'description' => 'Comfortable and non-slip yoga mat.',
        'price' => 29.99,
        'category' => 'Sports',
        'stock' => 18,
      ],
    ];

    foreach ($products as $prod)
    {
      $category = Category::where('name', $prod['category'])->first();
      if ($category)
      {
        Product::create([
          'name' => $prod['name'],
          'cover' => $prod['cover'],
          'description' => $prod['description'],
          'price' => $prod['price'],
          'category_id' => $category->id,
          'stock' => $prod['stock'],
        ]);
      }
    }
  }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Category;

class CategorySeeder extends Seeder
{
  public function run()
  {
    $categories = [
      [
        'name' => 'Electronics',
        'cover' => 'https://images.unsplash.com/photo-1518770660439-4636190af475?fit=crop&w=600&q=80',
      ],
      [
        'name' => 'Fashion',
        'cover' => 'https://images.unsplash.com/photo-1521334884684-d80222895322?fit=crop&w=600&q=80',
      ],
      [
        'name' => 'Home & Garden',
        'cover' => 'https://images.unsplash.com/photo-1507667985342-cd4c34f9b1e5?fit=crop&w=600&q=80',
      ],
      [
        'name' => 'Sports',
        'cover' => 'https://images.unsplash.com/photo-1517649763962-0c623066013b?fit=crop&w=600&q=80',
      ],
    ];

    foreach ($categories as $cat)
    {
      $category = Category::create($cat);
      $category->save(); // This will trigger sluggable
    }
  }
}

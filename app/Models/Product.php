<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
  use Sluggable;

  protected $table = 'products';
  protected $fillable = ['name', 'slug', 'cover', 'description', 'price', 'stock', 'category_id'];

  public function sluggable(): array
  {
    return [
      'slug' => [
        'source' => 'name'
      ]
    ];
  }

  public function category()
  {
    return $this->belongsTo(Category::class);
  }
}

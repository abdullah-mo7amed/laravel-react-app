<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Seeders\CategorySeeder;
use Database\Seeders\ProductSeeder;
use Illuminate\Support\Facades\Hash;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   */
  public function run(): void
  {
    // User::factory(10)->create();

    User::create([
      'name' => 'Test User',
      'email' => 'test@example.com',
      'password' => Hash::make('password')
    ]);

    $this->call(CategorySeeder::class);
    $this->call(ProductSeeder::class);
  }
}

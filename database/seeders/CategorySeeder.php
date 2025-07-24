<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\User;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $user = User::where('email', 'admin@admin.com')->first();
        if (! $user) {
            return;
        }

        Category::factory(10)->create(['user_id' => $user->id]);
    }
}

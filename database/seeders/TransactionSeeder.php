<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Transaction;
use App\Models\User;

class TransactionSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::where('email', 'admin@admin.com')->first();
        if (! $user) {
            return;
        }

        Transaction::factory(1)->create(['user_id' => $user->id]);
    }
}

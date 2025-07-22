<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Transaction;
use App\Models\User;

class TransactionSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::where('email', 'kalouvalou3@gmail.com')->first();
        if ($user) {
            Transaction::factory(50)->create(['user_id' => $user->id]);
        } else {
            Transaction::factory(50)->create();
        }
    }
}

<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Transaction;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TransactionTest extends TestCase
{
    use RefreshDatabase;

    public function test_transactions_page_is_displayed(): void
    {
        $user = User::factory()->create();
        Transaction::create([
            'user_id' => $user->id,
            'amount' => 10,
            'status' => 'pending',
            'reference' => 'test',
        ]);

        $response = $this->actingAs($user)->get(route('transactions.index'));

        $response->assertOk();
    }
}

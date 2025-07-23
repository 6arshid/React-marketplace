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

    public function test_user_can_request_payout(): void
    {
        $user = User::factory()->create();
        Transaction::factory()->create(['user_id' => $user->id, 'amount' => 20, 'status' => 'success']);
        Transaction::factory()->create(['user_id' => $user->id, 'amount' => 30, 'status' => 'success']);

        $response = $this->actingAs($user)->post(route('transactions.request'), [
            'amount' => 50,
        ]);

        $response->assertRedirect();

        $this->assertDatabaseHas('transactions', [
            'user_id' => $user->id,
            'amount' => 49,
            'status' => 'success',
        ]);

        $this->assertSame(1, Transaction::where('user_id', $user->id)->where('status', 'success')->count());
        $this->assertSame(2, Transaction::where('user_id', $user->id)->where('status', 'completed')->count());
    }

    public function test_admin_can_mark_all_transactions_paid(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        Transaction::factory()->count(3)->create(['status' => 'success']);

        $response = $this->actingAs($admin)->post(route('admin.transactions.pay-all'));

        $response->assertRedirect();

        $this->assertSame(3, Transaction::where('status', 'paid')->count());
    }
}

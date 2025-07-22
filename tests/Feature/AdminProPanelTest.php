<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminProPanelTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_add_pro_user(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $user = User::factory()->create(['pro_panel' => false]);

        $expires = now()->addDays(10)->format('Y-m-d');

        $response = $this->actingAs($admin)->post(route('admin.pro-panel.user'), [
            'email' => $user->email,
            'expires_at' => $expires,
        ]);

        $response->assertRedirect(route('admin.pro-panel.index'));

        $user->refresh();
        $this->assertTrue($user->pro_panel);
        $this->assertSame($expires, $user->pro_panel_expires_at->format('Y-m-d'));
    }
}

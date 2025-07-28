<?php

namespace App\Http\Controllers;

use App\Models\Coupon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class CouponController extends Controller
{
    public function index(): Response
    {
        $coupons = Coupon::where('user_id', auth()->id())
            ->latest()
            ->get();

        return Inertia::render('Coupons/Index', [
            'coupons' => $coupons,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Coupons/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => 'required|string',
            'code' => 'required|string|unique:coupons,code',
            'percent' => 'required|integer|min:1|max:100',
            'expires_at' => 'nullable|date',
        ]);

        $request->user()->coupons()->create($data);

        return Redirect::route('coupons.index')
            ->with('success', __('messages.saved'));
    }

    public function edit(Coupon $coupon): Response
    {
        return Inertia::render('Coupons/Edit', [
            'coupon' => $coupon,
        ]);
    }

    public function update(Request $request, Coupon $coupon): RedirectResponse
    {
        $data = $request->validate([
            'title' => 'required|string',
            'code' => 'required|string|unique:coupons,code,' . $coupon->id,
            'percent' => 'required|integer|min:1|max:100',
            'expires_at' => 'nullable|date',
        ]);

        $coupon->update($data);

        return Redirect::route('coupons.index')
            ->with('success', __('messages.saved'));
    }

    public function destroy(Coupon $coupon): RedirectResponse
    {
        $coupon->delete();

        return Redirect::route('coupons.index')
            ->with('success', __('messages.deleted'));
    }
}

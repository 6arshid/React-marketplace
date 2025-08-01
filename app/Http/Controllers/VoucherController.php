<?php

namespace App\Http\Controllers;

use App\Models\Voucher;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class VoucherController extends Controller
{
    public function index(): Response
    {
        $vouchers = Voucher::where('user_id', auth()->id())
            ->latest()
            ->get();

        return Inertia::render('Vouchers/Index', [
            'vouchers' => $vouchers,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Vouchers/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'public_code' => 'required|string|unique:vouchers,public_code',
            'secret_pin' => 'nullable|string',
            'initial_amount' => 'required|numeric',
            'type' => 'required|string',
            'frequency' => 'required|string',
            'expires_at' => 'nullable|date',
            'min_cart_amount' => 'nullable|numeric',
        ]);

        $data['balance'] = $data['initial_amount'];
        $data['secret_pin_hash'] = $data['secret_pin'] ? Hash::make($data['secret_pin']) : null;
        unset($data['secret_pin']);
        $data['status'] = 'ACTIVE';

        $constraints = [];
        if ($data['min_cart_amount']) {
            $constraints['min_cart_amount'] = (float) $data['min_cart_amount'];
        }
        unset($data['min_cart_amount']);
        $data['constraints'] = $constraints;

        $request->user()->vouchers()->create($data);

        return Redirect::route('vouchers.index')->with('success', __('messages.saved'));
    }

    public function edit(Voucher $voucher): Response
    {
        return Inertia::render('Vouchers/Edit', [
            'voucher' => $voucher,
        ]);
    }

    public function update(Request $request, Voucher $voucher): RedirectResponse
    {
        $data = $request->validate([
            'public_code' => 'required|string|unique:vouchers,public_code,' . $voucher->id,
            'secret_pin' => 'nullable|string',
            'initial_amount' => 'required|numeric',
            'type' => 'required|string',
            'frequency' => 'required|string',
            'expires_at' => 'nullable|date',
            'min_cart_amount' => 'nullable|numeric',
            'status' => 'required|string',
        ]);

        $data['secret_pin_hash'] = $data['secret_pin'] ? Hash::make($data['secret_pin']) : $voucher->secret_pin_hash;
        unset($data['secret_pin']);
        $constraints = [];
        if ($data['min_cart_amount']) {
            $constraints['min_cart_amount'] = (float) $data['min_cart_amount'];
        }
        unset($data['min_cart_amount']);
        $data['constraints'] = $constraints;
        $voucher->update($data);

        return Redirect::route('vouchers.index')->with('success', __('messages.saved'));
    }

    public function destroy(Voucher $voucher): RedirectResponse
    {
        $voucher->delete();

        return Redirect::route('vouchers.index')->with('success', __('messages.deleted'));
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Collection;

class Voucher extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'public_code',
        'secret_pin',
        'secret_pin_hash',
        'initial_amount',
        'balance',
        'type',
        'frequency',
        'status',
        'issued_at',
        'activated_at',
        'expires_at',
        'constraints',
    ];

    protected $casts = [
        'initial_amount' => 'decimal:2',
        'balance' => 'decimal:2',
        'issued_at' => 'datetime',
        'activated_at' => 'datetime',
        'expires_at' => 'datetime',
        'constraints' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class);
    }

    public function redemptions(): HasMany
    {
        return $this->hasMany(Redemption::class);
    }

    public function isApplicable(Collection $cartProducts): bool
    {
        if ($this->status !== 'ACTIVE') {
            return false;
        }

        if ($this->expires_at && $this->expires_at->isPast()) {
            return false;
        }

        $constraints = $this->constraints ?? [];

        if (isset($constraints['min_cart_amount'])) {
            $total = $cartProducts->sum(fn ($p) => $p['price']);
            if ($total < $constraints['min_cart_amount']) {
                return false;
            }
        }

        if (isset($constraints['allowed_product_ids'])) {
            $allowed = $constraints['allowed_product_ids'];
            if ($cartProducts->pluck('id')->diff($allowed)->isNotEmpty()) {
                return false;
            }
        }

        if (isset($constraints['allowed_types'])) {
            $allowedTypes = collect($constraints['allowed_types']);
            if ($allowedTypes->isNotEmpty()) {
                $diff = $cartProducts->filter(function ($p) use ($allowedTypes) {
                    $type = $p['is_digital'] ? 'DIGITAL' : 'PHYSICAL';
                    return ! $allowedTypes->contains($type);
                });
                if ($diff->isNotEmpty()) {
                    return false;
                }
            }
        }

        return true;
    }
}

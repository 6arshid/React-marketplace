<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $buyer_id
 * @property int $seller_id
 * @property array $items
 * @property int $amount
 * @property array|null $shipping_info
 * @property bool $is_digital
 * @property string|null $buyer_wallet
 * @property string $status
 * @property string $tracking_code
 * @property string|null $postal_tracking_code
 */
class Order extends Model
{
    protected $casts = [
        'items' => 'array',
        'shipping_info' => 'array',
        'is_digital' => 'boolean',
    ];

    protected $fillable = [
        'buyer_id',
        'seller_id',
        'items',
        'amount',
        'shipping_info',
        'is_digital',
        'status',
        'tracking_code',
        'postal_tracking_code',
        'buyer_wallet',
    ];

    public function buyer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    public function seller(): BelongsTo
    {
        return $this->belongsTo(User::class, 'seller_id');
    }
}

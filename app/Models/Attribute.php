<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property string $title
 * @property string $option
 * @property float $price
 * @property int $product_id
 */
class Attribute extends Model
{
    protected $fillable = ['title', 'option', 'price', 'product_id'];

    protected function casts(): array
    {
        return [
            'price' => 'float',
        ];
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}

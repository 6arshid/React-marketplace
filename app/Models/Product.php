<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property string|null $description
 * @property float $price
 * @property array|null $images
 * @property bool $is_digital
 * @property float|null $shipping_cost
 * @property string|null $demo_file
 * @property string|null $main_file
 * @property int $category_id
 * @property int $user_id
 */
class Product extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'description',
        'price',
        'images',
        'is_digital',
        'shipping_cost',
        'demo_file',
        'main_file',
        'category_id',
        'user_id',
    ];

    protected function casts(): array
    {
        return [
            'images' => 'array',
            'is_digital' => 'boolean',
            'price' => 'float',
            'shipping_cost' => 'float',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function attributes(): HasMany
    {
        return $this->hasMany(Attribute::class);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}

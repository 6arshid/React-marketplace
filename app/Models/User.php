<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Category;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\Order;
use App\Models\SocialLink;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'username',
        'name',
        'email',
        'is_admin',
        'is_seller',
        'trc20_usdt_wallet',
        'iban',
        'swift_code',
        'bitcoin_wallet',
        'whatsapp_number',
        'telegram_username',
        'public_email',
        'stripe_api_key',
        'stripe_secret_key',
        'stripe_customer_id',
        'pro_panel',
        'pro_panel_expires_at',
        'logo',
        'cover',
        'about',
        'instagram_username',
        'facebook_username',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_admin' => 'boolean',
            'is_seller' => 'boolean',
            'pro_panel' => 'boolean',
            'pro_panel_expires_at' => 'datetime',
            'stripe_api_key' => 'encrypted',
            'stripe_secret_key' => 'encrypted',
        ];
    }

    public function categories()
    {
        return $this->hasMany(Category::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class, 'buyer_id');
    }

    public function sales()
    {
        return $this->hasMany(Order::class, 'seller_id');
    }

    public function socialLinks()
    {
        return $this->hasMany(SocialLink::class);
    }

    public function pages()
    {
        return $this->hasMany(Page::class);
    }
}

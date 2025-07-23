import GuestLayout from '@/Layouts/GuestLayout';
import AddToCartPrompt from '@/Components/AddToCartPrompt';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function CategoryProducts({ user, category, products }) {
    const [showCartPrompt, setShowCartPrompt] = useState(false);
    const addToCart = (slug) => {
        router.post(route('cart.add', slug), {}, {
            onSuccess: () => setShowCartPrompt(true),
        });
    };

    return (
        <GuestLayout>
            <Head title={`${category.name} - ${user.username}`} />
            <h2 className="text-xl font-semibold">{category.name}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
                {products.map((p) => (
                    <div key={p.id} className="bg-white rounded-xl shadow p-4 flex flex-col">
                        {p.images && p.images.length > 0 && (
                            <Link href={route('products.show', p.slug)}>
                                <img
                                    src={`/storage/${p.images[0]}`}
                                    alt={p.title}
                                    className="h-40 w-full object-cover rounded-md mb-2"
                                />
                            </Link>
                        )}
                        <Link
                            href={route('products.show', p.slug)}
                            className="font-semibold hover:text-blue-600"
                        >
                            {p.title}
                        </Link>
                        <div className="text-sm text-gray-600 mb-4">${p.price}</div>
                        <button
                            onClick={() => addToCart(p.slug)}
                            className="mt-auto px-3 py-2 bg-blue-600 text-white rounded-md text-sm"
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
            <AddToCartPrompt
                show={showCartPrompt}
                onClose={() => setShowCartPrompt(false)}
                onGoToCart={() => router.visit(route('cart.show'))}
            />
        </GuestLayout>
    );
}

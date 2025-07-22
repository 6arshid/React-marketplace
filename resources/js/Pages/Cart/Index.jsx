import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head } from '@inertiajs/react';

export default function Index({ items, total }) {
    const message = encodeURIComponent(
        items
            .map((i) => `${i.product_title}${i.attribute ? ` (${i.attribute})` : ''} - $${i.price}`)
            .join('\n') + `\nTotal: $${total}`,
    );

    const whatsappUrl = `https://wa.me/?text=${message}`;
    const telegramUrl = `https://t.me/share/url?url=&text=${message}`;
    const mailUrl = `mailto:?subject=Order&body=${message}`;

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Cart</h2>}>
            <Head title="Cart" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-4">
                    <div className="bg-white p-4 shadow sm:rounded-lg space-y-2">
                        {items.length ? (
                            <ul className="list-disc ml-6 space-y-1">
                                {items.map((item, idx) => (
                                    <li key={idx}>
                                        {item.product_title}
                                        {item.attribute && ` - ${item.attribute}`}{' '}
                                        (${item.price})
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Your cart is empty.</p>
                        )}
                        <p className="font-semibold">Total: ${total}</p>
                        {items.length > 0 && (
                            <div className="space-x-3">
                                <a href={whatsappUrl} target="_blank" rel="noopener" className="text-blue-600 underline">
                                    Send via WhatsApp
                                </a>
                                <a href={telegramUrl} target="_blank" rel="noopener" className="text-blue-600 underline">
                                    Send via Telegram
                                </a>
                                <a href={mailUrl} className="text-blue-600 underline">
                                    Send via Email
                                </a>
                                <PrimaryButton type="button" disabled className="ms-2">
                                    Pay with Stripe
                                </PrimaryButton>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

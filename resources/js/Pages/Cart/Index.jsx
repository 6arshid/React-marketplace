import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { Head, useForm } from '@inertiajs/react';
import axios from 'axios';

export default function Index({ items, total, seller, requires_shipping }) {
    const message = encodeURIComponent(
        items
            .map((i) => `${i.product_title}${i.attribute ? ` (${i.attribute})` : ''} - $${i.price}`)
            .join('\n') + `\nTotal: $${total}`,
    );

    const whatsappUrl = seller?.pro_panel && seller.whatsapp_number
        ? `https://wa.me/${seller.whatsapp_number}?text=${message}`
        : `https://wa.me/?text=${message}`;

    const telegramUrl = seller?.pro_panel && seller.telegram_username
        ? `https://t.me/${seller.telegram_username}?text=${message}`
        : `https://t.me/share/url?url=&text=${message}`;

    const mailUrl = seller?.pro_panel && seller.public_email
        ? `mailto:${seller.public_email}?subject=Order&body=${message}`
        : `mailto:?subject=Order&body=${message}`;

    const { data, setData } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        postal_code: '',
        phone: '',
    });

    const checkout = async () => {
        const payload = requires_shipping ? data : {};
        const res = await axios.post(route('cart.checkout'), payload);
        alert('Tracking Code: ' + res.data.tracking_code);
    };

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
                       
                        {requires_shipping && items.length > 0 && (
                            <div className="space-y-2">
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <InputLabel htmlFor="first_name" value="First Name" />
                                        <TextInput id="first_name" className="mt-1 block w-full" value={data.first_name} onChange={(e) => setData('first_name', e.target.value)} />
                                        <InputError message={''} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="last_name" value="Last Name" />
                                        <TextInput id="last_name" className="mt-1 block w-full" value={data.last_name} onChange={(e) => setData('last_name', e.target.value)} />
                                        <InputError message={''} className="mt-2" />
                                    </div>
                                </div>
                                <div>
                                    <InputLabel htmlFor="email" value="Email" />
                                    <TextInput id="email" className="mt-1 block w-full" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="address" value="Address" />
                                    <TextInput id="address" className="mt-1 block w-full" value={data.address} onChange={(e) => setData('address', e.target.value)} />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <InputLabel htmlFor="postal_code" value="Postal Code" />
                                        <TextInput id="postal_code" className="mt-1 block w-full" value={data.postal_code} onChange={(e) => setData('postal_code', e.target.value)} />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="phone" value="Phone" />
                                        <TextInput id="phone" className="mt-1 block w-full" value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {items.length > 0 && seller?.pro_panel && (
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
                                <PrimaryButton type="button" onClick={checkout} className="ms-2">
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

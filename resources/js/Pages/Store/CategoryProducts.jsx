import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';

export default function CategoryProducts({ user, category, products }) {
    return (
        <GuestLayout>
            <Head title={`${category.name} - ${user.username}`} />
            <h2 className="text-xl font-semibold">{category.name}</h2>
            <ul className="mt-4 space-y-2">
                {products.map((p) => (
                    <li key={p.id} className="border-b pb-2">
                        {p.title} - ${p.price}
                    </li>
                ))}
            </ul>
        </GuestLayout>
    );
}

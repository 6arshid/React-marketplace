import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ orders }) {

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Orders</h2>}>
            <Head title="Orders" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Tracking</th>
                                    <th className="px-4 py-2">Amount</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2">Seller</th>
                                    <th className="px-4 py-2">Postal Code</th>
                                    <th className="px-4 py-2">Track</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((o) => (
                                    <tr key={o.id}>
                                        <td className="border px-4 py-2">{o.tracking_code}</td>
                                        <td className="border px-4 py-2">${o.amount}</td>
                                        <td className="border px-4 py-2">{o.status}</td>
                                        <td className="border px-4 py-2">{o.seller.name}</td>
                                        <td className="border px-4 py-2">{o.postal_tracking_code || (o.is_digital ? 'Download available' : '-')}</td>
                                        <td className="border px-4 py-2 text-blue-600 underline">
                                            <Link href={route('orders.track', o.tracking_code)}>View</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

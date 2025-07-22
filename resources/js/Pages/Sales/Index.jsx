import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ orders }) {
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Sales</h2>}>
            <Head title="Sales" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Tracking</th>
                                    <th className="px-4 py-2">Amount</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2">Buyer</th>
                                    <th className="px-4 py-2">Shipping</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((o) => (
                                    <tr key={o.id}>
                                        <td className="border px-4 py-2">{o.tracking_code}</td>
                                        <td className="border px-4 py-2">${o.amount}</td>
                                        <td className="border px-4 py-2">{o.status}</td>
                                        <td className="border px-4 py-2">{o.buyer.name}</td>
                                        <td className="border px-4 py-2">
                                            {o.shipping_info
                                                ? `${o.shipping_info.first_name} ${o.shipping_info.last_name}, ${o.shipping_info.address}`
                                                : '-'}
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

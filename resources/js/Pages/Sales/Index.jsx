import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UpdateStatusForm from './Partials/UpdateStatusForm';

export default function Index({ orders, commission_percent }) {
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
                                    <th className="px-4 py-2">Buyer Wallet</th>
                                    <th className="px-4 py-2">Shipping</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((o) => (
                                    <tr key={o.id}>
                                        <td className="border px-4 py-2">{o.tracking_code}</td>
                                        <td className="border px-4 py-2">${o.net_amount ?? o.amount}</td>
                                        <td className="border px-4 py-2">
                                            <UpdateStatusForm order={o} />
                                        </td>
                                        <td className="border px-4 py-2">{o.buyer.name}</td>
                                        <td className="border px-4 py-2">{o.buyer_wallet || '-'}</td>
                                        <td className="border px-4 py-2">
                                            {o.shipping_info
                                                ? `${o.shipping_info.first_name} ${o.shipping_info.last_name}, ${o.shipping_info.address}`
                                                : '-'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {commission_percent > 0 && (
                            <p className="p-4 text-sm text-gray-500">
                                {commission_percent}% commission has been deducted from the amount shown.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

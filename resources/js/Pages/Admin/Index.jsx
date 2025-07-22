import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index() {
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Admin Dashboard</h2>}>
            <Head title="Admin Dashboard" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg space-y-2">
                        <div>
                            <Link href={route('admin.stripe.edit')} className="text-blue-500 hover:underline">
                                Configure Stripe
                            </Link>
                        </div>
                        <div>
                            <Link href={route('admin.users.index')} className="text-blue-500 hover:underline">
                                Manage Users
                            </Link>
                        </div>
                        <div>
                            <Link href={route('admin.transactions.index')} className="text-blue-500 hover:underline">
                                Transactions
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

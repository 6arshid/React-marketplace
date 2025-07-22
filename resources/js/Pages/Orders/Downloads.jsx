import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Downloads({ orders }) {
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Downloads</h2>}>
            <Head title="Downloads" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-4 sm:px-6 lg:px-8">
                    {orders.map((o) => (
                        <div key={o.id} className="overflow-hidden bg-white p-4 shadow sm:rounded-lg">
                            <h3 className="font-semibold">Order {o.tracking_code}</h3>
                            <ul className="list-disc ml-6">
                                {o.files.map((f, idx) => (
                                    <li key={idx}>
                                        <a href={`/storage/${f.path}`} target="_blank" rel="noopener">
                                            {f.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

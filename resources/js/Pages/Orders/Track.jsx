import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';

export default function Track({ order, files }) {
    return (
        <GuestLayout>
            <Head title="Track Order" />
            <div className="space-y-2">
                <h2 className="text-lg font-semibold">Tracking Code: {order.tracking_code}</h2>
                <p>Status: {order.status}</p>
                {order.postal_tracking_code && <p>Postal Code: {order.postal_tracking_code}</p>}
                {files.length > 0 && (
                    <div>
                        <h3 className="font-semibold">Downloads</h3>
                        <ul className="list-disc ml-6">
                            {files.map((f, idx) => (
                                <li key={idx}>
                                    <a href={`/storage/${f.path}`} target="_blank" rel="noopener">
                                        {f.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </GuestLayout>
    );
}

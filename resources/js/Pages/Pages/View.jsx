import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';

export default function View({ page }) {
    return (
        <GuestLayout>
            <Head title={page.title} />
            <div className="max-w-3xl mx-auto py-12 px-4">
                <h1 className="text-3xl font-bold mb-4">{page.title}</h1>
                {page.images && page.images.length > 0 && (
                    <div className="mb-6 grid grid-cols-2 gap-4">
                        {page.images.map((img, idx) => (
                            <img key={idx} src={`/storage/${img}`} className="rounded" />
                        ))}
                    </div>
                )}
                <div dangerouslySetInnerHTML={{ __html: page.description }} className="prose"></div>
            </div>
        </GuestLayout>
    );
}

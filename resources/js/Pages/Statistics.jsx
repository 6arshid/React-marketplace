import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export default function Statistics({ topProducts = [], labels = [] }) {
    const { t } = useTranslation();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">{t('Statistics')}</h2>}>
            <Head title={t('Statistics')} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                        <h3 className="text-lg font-semibold mb-4">{t('Top 10 Products')}</h3>
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left">{t('Product')}</th>
                                    <th className="px-4 py-2 text-right">{t('Views')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topProducts.map((p) => (
                                    <tr key={p.id} className="border-b">
                                        <td className="px-4 py-2">
                                            <Link href={route('products.show', p.slug)} className="text-blue-600 hover:underline">
                                                {p.title}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-2 text-right">{p.views}</td>
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

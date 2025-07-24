import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function Sitemap({ users, products, sitemapUrl }) {
    const { t } = useTranslation();
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">{t('Sitemap')}</h2>}>
            <Head title={t('Sitemap')} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-4 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg">
                        <a href={sitemapUrl} className="text-blue-500 hover:underline">
                            {t('Sitemap URL')}
                        </a>
                    </div>
                    <div className="bg-white p-4 shadow sm:rounded-lg">
                        <h3 className="mb-2 text-lg font-semibold">{t('Users')}</h3>
                        <ul className="list-disc list-inside space-y-1">
                            {users.map((u) => (
                                <li key={u.id}>{u.name || u.username}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white p-4 shadow sm:rounded-lg">
                        <h3 className="mb-2 text-lg font-semibold">{t('Products')}</h3>
                        <ul className="list-disc list-inside space-y-1">
                            {products.map((p) => (
                                <li key={p.id}>{p.title}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Pagination from '@/Components/Pagination';

export default function Sitemap({ users, products, sitemapUrl }) {
    const { t } = useTranslation();

    const [usersPage, setUsersPage] = useState(1);
    const [productsPage, setProductsPage] = useState(1);

    const usersTotalPages = Math.ceil(users.length / 10);
    const productsTotalPages = Math.ceil(products.length / 10);

    const paginatedUsers = users.slice((usersPage - 1) * 10, usersPage * 10);
    const paginatedProducts = products.slice((productsPage - 1) * 10, productsPage * 10);

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
                            {paginatedUsers.map((u) => (
                                <li key={u.id}>
                                    <Link
                                        href={route('profile.show', u.username)}
                                        className="text-blue-500 hover:underline"
                                    >
                                        {u.name || u.username}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <Pagination
                            currentPage={usersPage}
                            totalPages={usersTotalPages}
                            onPageChange={setUsersPage}
                        />
                    </div>
                    <div className="bg-white p-4 shadow sm:rounded-lg">
                        <h3 className="mb-2 text-lg font-semibold">{t('Products')}</h3>
                        <ul className="list-disc list-inside space-y-1">
                            {paginatedProducts.map((p) => (
                                <li key={p.id}>
                                    <Link
                                        href={route('products.show', p.slug)}
                                        className="text-blue-500 hover:underline"
                                    >
                                        {p.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <Pagination
                            currentPage={productsPage}
                            totalPages={productsTotalPages}
                            onPageChange={setProductsPage}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

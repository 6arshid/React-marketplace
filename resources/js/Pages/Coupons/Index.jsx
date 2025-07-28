import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function Index({ coupons }) {
    const { t } = useTranslation();

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">{t('Discount Codes')}</h2>}>
            <Head title={t('Discount Codes')} />
            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-end mb-4">
                        <PrimaryButton as={Link} href={route('coupons.create')}>{t('New Code')}</PrimaryButton>
                    </div>
                    {coupons.length ? (
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <table className="min-w-full">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 text-left">{t('Title')}</th>
                                        <th className="px-4 py-2 text-left">{t('Code')}</th>
                                        <th className="px-4 py-2 text-left">{t('Percent')}</th>
                                        <th className="px-4 py-2 text-left">{t('Expires')}</th>
                                        <th className="px-4 py-2 text-left">{t('Actions')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {coupons.map(c => (
                                        <tr key={c.id} className="border-t">
                                            <td className="px-4 py-2">{c.title}</td>
                                            <td className="px-4 py-2">{c.code}</td>
                                            <td className="px-4 py-2">{c.percent}%</td>
                                            <td className="px-4 py-2">{c.expires_at ?? '-'}</td>
                                            <td className="px-4 py-2 space-x-2">
                                                <Link href={route('coupons.edit', c.id)} className="text-blue-600 hover:underline">
                                                    {t('Edit')}
                                                </Link>
                                                <Link href={route('coupons.destroy', c.id)} method="delete" as="button" className="text-red-600 hover:underline" onClick={e => { if(!confirm(t('Are you sure?'))) e.preventDefault(); }}>
                                                    {t('Delete')}
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-600">{t('No discount codes yet.')}</p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

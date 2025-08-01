import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function Index({ vouchers }) {
    const { t } = useTranslation();

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">{t('Vouchers')}</h2>}>
            <Head title={t('Vouchers')} />
            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-end mb-4">
                        <PrimaryButton as={Link} href={route('vouchers.create')}>{t('New Voucher')}</PrimaryButton>
                    </div>
                    {vouchers.length ? (
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <table className="min-w-full">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 text-left">{t('Code')}</th>
                                        <th className="px-4 py-2 text-left">{t('Balance')}</th>
                                        <th className="px-4 py-2 text-left">{t('Status')}</th>
                                        <th className="px-4 py-2 text-left">{t('Actions')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vouchers.map(v => (
                                        <tr key={v.id} className="border-t">
                                            <td className="px-4 py-2">{v.public_code}</td>
                                            <td className="px-4 py-2">{v.balance}</td>
                                            <td className="px-4 py-2">{v.status}</td>
                                            <td className="px-4 py-2 space-x-2">
                                                <Link href={route('vouchers.edit', v.id)} className="text-blue-600 hover:underline">
                                                    {t('Edit')}
                                                </Link>
                                                <Link href={route('vouchers.destroy', v.id)} method="delete" as="button" className="text-red-600 hover:underline" onClick={e => { if(!confirm(t('Are you sure?'))) e.preventDefault(); }}>
                                                    {t('Delete')}
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-600">{t('No vouchers yet.')}</p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

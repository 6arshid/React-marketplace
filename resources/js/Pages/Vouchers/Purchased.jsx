import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function Purchased({ vouchers }) {
    const { t } = useTranslation();

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">{t('Vouchers')}</h2>}>
            <Head title={t('Vouchers')} />
            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {vouchers.length ? (
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <table className="min-w-full">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 text-left">{t('Product')}</th>
                                        <th className="px-4 py-2 text-left">{t('Voucher Code')}</th>
                                        <th className="px-4 py-2 text-left">{t('PIN')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vouchers.map((v, i) => (
                                        <tr key={i} className="border-t">
                                            <td className="px-4 py-2">{v.product}</td>
                                            <td className="px-4 py-2 font-mono">{v.code}</td>
                                            <td className="px-4 py-2 font-mono">{v.pin || '-'}</td>
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

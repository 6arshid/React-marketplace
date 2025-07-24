import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function Index() {
    const { t } = useTranslation();

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">{t('Admin Dashboard')}</h2>}>
            <Head title={t('Admin Dashboard')} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg space-y-2">
                        <div>
                            <Link href={route('admin.stripe.edit')} className="text-blue-500 hover:underline">
                                {t('Configure Stripe')}
                            </Link>
                        </div>
                        <div>
                            <Link href={route('admin.transactions.index')} className="text-blue-500 hover:underline">
                                {t('Transactions')}
                            </Link>
                        </div>
                        <div>
                            <Link href={route('admin.pro-panel.index')} className="text-blue-500 hover:underline">
                                {t('Pro Panel')}
                            </Link>
                        </div>
                        <div>
                            <Link href={route('admin.reports.index')} className="text-blue-500 hover:underline">
                                {t('Reports')}
                            </Link>
                        </div>
                        <div>
                            <Link href={route('admin.appearance.edit')} className="text-blue-500 hover:underline">
                                {t('Appearance')}
                            </Link>
                        </div>
                        <div>
                            <Link href={route('admin.general-config.edit')} className="text-blue-500 hover:underline">
                                {t('General Config')}
                            </Link>
                        </div>
                        <div>
                            <Link href={route('admin.pages.index')} className="text-blue-500 hover:underline">
                                {t('Pages')}
                            </Link>
                        </div>
                        <div>
                            <Link href={route('admin.reserved-usernames.index')} className="text-blue-500 hover:underline">
                                {t('Reserved Usernames')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

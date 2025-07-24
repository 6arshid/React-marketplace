import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function Users({ users }) {
    const { t } = useTranslation();

    const suspend = (id) => {
        if (!confirm('Suspend this user?')) return;
        window.axios.post(route('admin.users.suspend', id)).then(() => window.location.reload());
    };

    const unsuspend = (id) => {
        if (!confirm('Unsuspend this user?')) return;
        window.axios.post(route('admin.users.unsuspend', id)).then(() => window.location.reload());
    };

    const destroy = (id) => {
        if (!confirm(t('Delete?'))) return;
        router.delete(route('admin.users.destroy', id));
    };

    const makeAdmin = (id) => {
        if (!confirm('Make Admin?')) return;
        window.axios.post(route('admin.users.make-admin', id)).then(() => window.location.reload());
    };

    const onPageChange = (p) => {
        router.visit(route('admin.users.index', { page: p }));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">{t('Users')}</h2>}>
            <Head title={t('Users')} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left">{t('User')}</th>
                                    <th className="px-4 py-2">{t('Email')}</th>
                                    <th className="px-4 py-2 text-right">{t('Actions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.data.map((u) => (
                                    <tr key={u.id} className="border-b">
                                        <td className="px-4 py-2">
                                            <Link href={route('profile.show', u.username)} className="text-blue-500 hover:underline">
                                                {u.name || u.username}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-2">{u.email}</td>
                                        <td className="px-4 py-2 space-x-2 text-right">
                                            {u.suspended_at ? (
                                                <PrimaryButton onClick={() => unsuspend(u.id)}>{t('Unsuspend')}</PrimaryButton>
                                            ) : (
                                                <PrimaryButton onClick={() => suspend(u.id)}>{t('Suspend')}</PrimaryButton>
                                            )}
                                            {!u.is_admin && (
                                                <PrimaryButton onClick={() => makeAdmin(u.id)}>{t('Make Admin')}</PrimaryButton>
                                            )}
                                            <button onClick={() => destroy(u.id)} className="text-red-600 hover:underline">
                                                {t('Delete')}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {users.last_page > 1 && users.total >= 10 && (
                            <Pagination currentPage={users.current_page} totalPages={users.last_page} onPageChange={onPageChange} />
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

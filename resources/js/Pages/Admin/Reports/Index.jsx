import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, router } from '@inertiajs/react';

export default function Reports({ reports }) {

    const suspend = (userId) => {
        if (!confirm('Suspend this user?')) return;
        window.axios.post(route('admin.reports.suspend', userId)).then(() => window.location.reload());
    };

    const unsuspend = (userId) => {
        if (!confirm('Unsuspend this user?')) return;
        window.axios.post(route('admin.reports.unsuspend', userId)).then(() => window.location.reload());
    };

    const onPageChange = (p) => {
        router.visit(route('admin.reports.index', { page: p }));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Reports</h2>}>
            <Head title="Reports" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                        <table className="min-w-full" id="reports-table">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left">Reported User</th>
                                    <th className="px-4 py-2">Reporter</th>
                                    <th className="px-4 py-2">Reason</th>
                                    <th className="px-4 py-2">Evidence</th>
                                    <th className="px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports.data.map(r => (
                                    <tr key={r.id} className="border-b">
                                        <td className="px-4 py-2">
                                            <Link href={route('profile.show', r.reported_user.username)} className="text-blue-500 hover:underline">
                                                {r.reported_user?.name || r.reported_user?.username}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-2">
                                            {r.reporter ? (
                                                <Link href={route('profile.show', r.reporter.username)} className="text-blue-500 hover:underline">
                                                    {r.reporter.name || r.reporter.username}
                                                </Link>
                                            ) : (
                                                'Guest'
                                            )}
                                        </td>
                                        <td className="px-4 py-2">{r.reason}</td>
                                        <td className="px-4 py-2">
                                            {r.evidence && (
                                                <a href={`/storage/${r.evidence}`} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                                            )}
                                        </td>
                                        <td className="px-4 py-2 text-right">
                                            {r.reported_user?.suspended_at ? (
                                                <PrimaryButton onClick={() => unsuspend(r.reported_user_id)}>Unsuspend</PrimaryButton>
                                            ) : (
                                                <PrimaryButton onClick={() => suspend(r.reported_user_id)}>Suspend</PrimaryButton>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {reports.last_page > 1 && reports.total >= 10 && (
                            <Pagination currentPage={reports.current_page} totalPages={reports.last_page} onPageChange={onPageChange} />
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, router } from '@inertiajs/react';

export default function ReviewReports({ reports }) {

    const suspend = (id) => {
        if (!confirm('Suspend this review?')) return;
        window.axios.post(route('admin.review-reports.suspend', id)).then(() => window.location.reload());
    };

    const unsuspend = (id) => {
        if (!confirm('Unsuspend this review?')) return;
        window.axios.post(route('admin.review-reports.unsuspend', id)).then(() => window.location.reload());
    };

    const destroy = (id) => {
        if (!confirm('Delete?')) return;
        router.delete(route('admin.review-reports.destroy', id));
    };

    const onPageChange = (p) => {
        router.visit(route('admin.review-reports.index', { page: p }));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Review Reports</h2>}>
            <Head title="Review Reports" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                        <table className="min-w-full" id="review-reports-table">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left">Review</th>
                                    <th className="px-4 py-2">Reviewer</th>
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
                                            <Link href={route('products.show', r.review.product.slug)} className="text-blue-500 hover:underline">
                                                {r.review.body.substring(0, 50)}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-2">
                                            {r.review.user ? (
                                                <Link href={route('profile.show', r.review.user.username)} className="text-blue-500 hover:underline">
                                                    {r.review.user.name || r.review.user.username}
                                                </Link>
                                            ) : (
                                                'User Deleted'
                                            )}
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
                                        <td className="px-4 py-2 space-x-2 text-right">
                                            {r.review.suspended_at ? (
                                                <PrimaryButton onClick={() => unsuspend(r.review_id)}>Unsuspend</PrimaryButton>
                                            ) : (
                                                <PrimaryButton onClick={() => suspend(r.review_id)}>Suspend</PrimaryButton>
                                            )}
                                            <button onClick={() => destroy(r.review_id)} className="text-red-600 hover:underline">Delete</button>
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

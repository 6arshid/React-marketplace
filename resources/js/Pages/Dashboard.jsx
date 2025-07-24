import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 space-y-2">
                            <p className="text-lg font-medium">Welcome, {user.name}!</p>
                            <p className="text-sm text-gray-700">
                                <Link href={route('profile.edit')} className="text-blue-600 hover:underline">
                                    Edit your profile
                                </Link>{' '}
                                or view it at{' '}
                                <Link href={route('profile.show', user.username)} className="text-blue-600 hover:underline">
                                    /{user.username}
                                </Link>.
                                {' '}Use the sidebar menu for more options.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

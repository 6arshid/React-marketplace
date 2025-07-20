import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link } from '@inertiajs/react';

export default function Index({ products }) {
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Products</h2>}>
            <Head title="Products" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-4">
                        <PrimaryButton as={Link} href={route('products.create')}>
                            New Product
                        </PrimaryButton>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Title</th>
                                    <th className="px-4 py-2">Category</th>
                                    <th className="px-4 py-2">Price</th>
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((p) => (
                                    <tr key={p.id}>
                                        <td className="border px-4 py-2">
                                            <Link href={route('products.show', p.slug)} className="text-blue-600 hover:underline">
                                                {p.title}
                                            </Link>
                                        </td>
                                        <td className="border px-4 py-2">{p.category?.name}</td>
                                        <td className="border px-4 py-2">${p.price}</td>
                                        <td className="border px-4 py-2 whitespace-nowrap">
                                            <Link href={route('products.edit', p.slug)} className="text-sm text-blue-500 me-2">
                                                Edit
                                            </Link>
                                            <Link
                                                href={route('products.destroy', p.slug)}
                                                method="delete"
                                                as="button"
                                                className="text-sm text-red-500"
                                            >
                                                Delete
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

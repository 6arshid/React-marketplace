import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import SearchBar from '@/Components/SearchBar';
import Pagination from '@/Components/Pagination';

export default function Index({ pages }) {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => setCurrentPage(1), [search]);

    const filtered = pages.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.ceil(filtered.length / 10);
    const paginated = filtered.slice((currentPage - 1) * 10, currentPage * 10);

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Pages</h2>}>
            <Head title="Pages" />
            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between mb-4">
                        <SearchBar value={search} onChange={setSearch} placeholder="Search pages" />
                        <PrimaryButton as={Link} href={route('admin.pages.create')}>New Page</PrimaryButton>
                    </div>
                    {paginated.length ? (
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <table className="min-w-full">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 text-left">Title</th>
                                        <th className="px-4 py-2 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginated.map((p) => (
                                        <tr key={p.id} className="border-t">
                                            <td className="px-4 py-2">{p.title}</td>
                                            <td className="px-4 py-2 space-x-2">
                                                <Link href={route('pages.show', p.slug)} className="text-blue-500 hover:underline">View</Link>
                                                <Link href={route('admin.pages.edit', p.slug)} className="text-indigo-500 hover:underline">Edit</Link>
                                                <Link href={route('admin.pages.destroy', p.slug)} method="delete" as="button" className="text-red-500 hover:underline" onClick={e=>{if(!confirm('Delete?')) e.preventDefault();}}>Delete</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">No pages found</p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

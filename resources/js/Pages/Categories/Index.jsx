import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import SearchBar from '@/Components/SearchBar';
import Pagination from '@/Components/Pagination';

// Custom SVG Icons
const PlusIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

const EditIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
);

const DeleteIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3,6 5,6 21,6"></polyline>
        <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
);

const FolderIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>
    </svg>
);

const EmptyStateIcon = () => (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>
        <circle cx="12" cy="14" r="2"/>
    </svg>
);

export default function Index({ categories }) {
    const user = usePage().props.auth.user;

    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => setCurrentPage(1), [search]);

    const filteredCategories = categories.filter((c) =>
        `${c.name} ${c.slug}`.toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.ceil(filteredCategories.length / 10);
    const paginatedCategories = filteredCategories.slice(
        (currentPage - 1) * 10,
        currentPage * 10
    );
    
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Categories</h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Manage your content categories
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Categories" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Action Bar */}
                    <div className="mb-8">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex items-center space-x-4">
                                    <div className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                                        <FolderIcon />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {filteredCategories.length} {filteredCategories.length === 1 ? 'Category' : 'Categories'}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Organize your content effectively
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <SearchBar value={search} onChange={setSearch} placeholder="Search categories" />
                                    <Link
                                        href={route('categories.create')}
                                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105"
                                    >
                                        <PlusIcon />
                                        New Category
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Categories Grid */}
                    {filteredCategories.length > 0 ? (
                        <>
                        <div className="grid gap-4">
                            {paginatedCategories.slice().reverse().map((cat, index) => (
                                <div
                                    key={cat.id}
                                    className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 overflow-hidden"
                                    style={{
                                        animationDelay: `${index * 50}ms`,
                                        animation: 'slideInUp 0.6s ease-out forwards'
                                    }}
                                >
                                    <div className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4 flex-1">
                                                <div className="p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl group-hover:from-blue-50 group-hover:to-indigo-50 transition-all duration-300">
                                                    <FolderIcon />
                                                </div>
                                                <div className="flex-1">
                                                    <Link
                                                        href={route('store.categories.show', [user.username, cat.slug])}
                                                        className="block group"
                                                    >
                                                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                                                            {cat.name}
                                                        </h3>
                                                        <p className="text-sm text-gray-500 mt-1">
                                                            Category slug: {cat.slug}
                                                        </p>
                                                    </Link>
                                                </div>
                                            </div>
                                            
                                            {/* Action Buttons */}
                                            <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                                                <Link
                                                    href={route('categories.edit', cat.slug)}
                                                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                                                >
                                                    <EditIcon />
                                                    Edit
                                                </Link>
                                                <Link
                                                    href={route('categories.destroy', cat.slug)}
                                                    method="delete"
                                                    as="button"
                                                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                                                    onClick={(e) => {
                                                        if (!confirm('Are you sure you want to delete this category?')) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                    Delete
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                        </>
                    ) : (
                        /* Empty State */
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                            <div className="flex flex-col items-center">
                                <EmptyStateIcon />
                                <h3 className="mt-6 text-lg font-semibold text-gray-900">
                                    No categories yet
                                </h3>
                                <p className="mt-2 text-sm text-gray-500 max-w-sm">
                                    Get started by creating your first category to organize your content.
                                </p>
                                <Link
                                    href={route('categories.create')}
                                    className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                                >
                                    <PlusIcon />
                                    Create Your First Category
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </AuthenticatedLayout>
    );
}
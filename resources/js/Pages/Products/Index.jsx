import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import SearchBar from '@/Components/SearchBar';
import Pagination from '@/Components/Pagination';

export default function Index({ products }) {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => setCurrentPage(1), [search]);

    const sortedProducts = [...products].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    const filteredProducts = sortedProducts.filter((p) =>
        `${p.title} ${p.category?.name}`.toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.ceil(filteredProducts.length / 10);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * 10,
        currentPage * 10
    );

    return (
        <AuthenticatedLayout 
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                        Products
                    </h2>
                    <div className="text-sm text-gray-500 font-medium">
                        {filteredProducts.length} items
                    </div>
                </div>
            }
        >
            <Head title="Products" />
            
            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
                            <p className="mt-2 text-gray-600">Manage and organize your product catalog</p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                            <SearchBar value={search} onChange={setSearch} placeholder="Search products" />
                            <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                                </svg>
                                Filter
                            </button>
                            
                            <PrimaryButton 
                                as={Link} 
                                href={route('products.create')}
                                className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                New Product
                            </PrimaryButton>
                        </div>
                    </div>

                    {/* Products Grid/Table */}
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 9h.01M15 9h.01M9 15h.01M15 15h.01" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                                <p className="text-gray-500 mb-6">Get started by creating your first product.</p>
                                <PrimaryButton as={Link} href={route('products.create')}>
                                    Create Product
                                </PrimaryButton>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-100">
                                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                    </svg>
                                                    Product
                                                </div>
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                    </svg>
                                                    Category
                                                </div>
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                                    </svg>
                                                    Price
                                                </div>
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    Views
                                                </div>
                                            </th>
                                            <th className="px-6 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-50">
                                        {paginatedProducts.map((p, index) => (
                                            <tr 
                                                key={p.id} 
                                                className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/30 transition-all duration-300 group"
                                            >
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl flex items-center justify-center mr-4 group-hover:scale-105 transition-transform">
                                                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <Link 
                                                                href={route('products.show', p.slug)} 
                                                                className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200 group-hover:underline"
                                                            >
                                                                {p.title}
                                                            </Link>
                                                            <p className="text-sm text-gray-500 mt-1">ID: #{p.id}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    {p.category?.name ? (
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200">
                                                            {p.category.name}
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-500">
                                                            Uncategorized
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="text-lg font-bold text-gray-900">
                                                        ${parseFloat(p.price).toLocaleString()}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">{p.views}</td>
                                                <td className="px-6 py-5 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            href={route('products.edit', p.slug)}
                                                            className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-all duration-200 hover:scale-105"
                                                            title="Edit product"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                        </Link>
                                                        <Link
                                                            href={route('products.destroy', p.slug)}
                                                            method="delete"
                                                            as="button"
                                                            className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-all duration-200 hover:scale-105"
                                                            title="Delete product"
                                                            onClick={(e) => {
                                                                if (!confirm('Are you sure you want to delete this product?')) {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                    </div>

                    {/* Statistics Footer */}
                    {filteredProducts.length > 0 && (
                        <div className="mt-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900">{filteredProducts.length}</div>
                                    <div className="text-sm text-gray-600 font-medium">Total Products</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">
                                        ${filteredProducts.reduce((sum, p) => sum + parseFloat(p.price || 0), 0).toLocaleString()}
                                    </div>
                                    <div className="text-sm text-gray-600 font-medium">Total Value</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600">
                                        {new Set(filteredProducts.map(p => p.category?.name).filter(Boolean)).size}
                                    </div>
                                    <div className="text-sm text-gray-600 font-medium">Categories</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-purple-600">
                                        {filteredProducts.reduce((sum, p) => sum + (p.views || 0), 0)}
                                    </div>
                                    <div className="text-sm text-gray-600 font-medium">Total Views</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
import GuestLayout from '@/Layouts/GuestLayout';
import AddToCartPrompt from '@/Components/AddToCartPrompt';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function CategoryProducts({ user, category, products }) {
    const [showCartPrompt, setShowCartPrompt] = useState(false);
    
    const addToCart = (slug) => {
        router.post(route('cart.add', slug), {}, {
            onSuccess: () => setShowCartPrompt(true),
        });
    };

    return (
        <GuestLayout>
            <Head title={`${category.name} - ${user.username}`} />
            
            {/* Hero Header */}
            <div className="relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 mb-12">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="text-center">
                        {/* Breadcrumb */}
                        <nav className="flex justify-center mb-6">
                            <ol className="flex items-center space-x-2 text-white/80 text-sm">
                                <li>
                                    <Link 
                                        href={route('profile.show', user.username)} 
                                        className="hover:text-white transition-colors duration-200"
                                    >
                                        {user.name}
                                    </Link>
                                </li>
                                <li>
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </li>
                                <li className="text-white font-medium">{category.name}</li>
                            </ol>
                        </nav>
                        
                        {/* Category Title */}
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            {category.name}
                        </h1>
                        
                        {/* Category Description */}
                        {category.description && (
                            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                                {category.description}
                            </p>
                        )}
                        
                        {/* Products Count */}
                        <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mt-6">
                            <svg className="w-5 h-5 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            <span className="text-white font-medium">
                                {products.length} {products.length === 1 ? 'Product' : 'Products'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.map((p) => (
                            <div key={p.id} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                                {/* Product Image */}
                                {p.images && p.images.length > 0 && (
                                    <Link href={route('products.show', p.slug)} className="block relative overflow-hidden">
                                        <div className="aspect-square bg-gray-100">
                                            <img
                                                src={`/storage/${p.images[0]}`}
                                                alt={p.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        
                                        {/* Overlay on hover */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                                                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )}
                                
                                {/* Product Info */}
                                <div className="p-6">
                                    <Link
                                        href={route('products.show', p.slug)}
                                        className="block font-semibold text-gray-900 hover:text-indigo-600 transition-colors duration-200 mb-3 line-clamp-2 leading-tight"
                                    >
                                        {p.title}
                                    </Link>
                                    
                                    {/* Price */}
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-2xl font-bold text-indigo-600">
                                            ${p.price}
                                        </span>

                                        {/* Rating or badge could go here */}
                                        <div className="flex items-center text-gray-400">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-gray-500 text-sm mb-4">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        <span>{p.views}</span>
                                    </div>
                                    
                                    {/* Add to Cart Button */}
                                    <button
                                        onClick={() => addToCart(p.slug)}
                                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 hover:shadow-lg transform hover:scale-105 flex items-center justify-center group"
                                    >
                                        <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5m0 0h9.1M16 18a2 2 0 11-4 0 2 2 0 014 0zM9 18a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="text-center py-16">
                        <div className="max-w-md mx-auto">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                No products found
                            </h3>
                            <p className="text-gray-600 mb-6">
                                This category doesn't have any products yet.
                            </p>
                            <Link
                                href={route('profile.show', user.username)}
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Profile
                            </Link>
                        </div>
                    </div>
                )}

                {/* Back to Profile Link */}
                {products.length > 0 && (
                    <div className="text-center mt-12">
                        <Link
                            href={route('profile.show', user.username)}
                            className="inline-flex items-center px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-md"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to {user.name}'s Profile
                        </Link>
                    </div>
                )}
            </div>

            {/* Add to Cart Prompt */}
            <AddToCartPrompt
                show={showCartPrompt}
                onClose={() => setShowCartPrompt(false)}
                onGoToCart={() => router.visit(route('cart.show'))}
            />
        </GuestLayout>
    );
}
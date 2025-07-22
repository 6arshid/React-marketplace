import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Show({ product }) {
    const [selected, setSelected] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const addAttributeToCart = (id) => {
        router.post(route('cart.add', product.slug), { attribute_id: id }, {
            onSuccess: () => {
                setShowSuccessModal(true);
                setTimeout(() => setShowSuccessModal(false), 3000);
            },
        });
        setSelected(id);
    };

    const addToCart = () => {
        router.post(route('cart.add', product.slug), {}, {
            onSuccess: () => {
                setShowSuccessModal(true);
                setTimeout(() => setShowSuccessModal(false), 3000);
            },
        });
    };

    const selectedAttribute = product.attributes?.find(attr => attr.id === selected);
    const currentPrice = selected ? selectedAttribute?.price : product.price;

    return (
        <AuthenticatedLayout 
            header={
                <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 py-8">
                    <h2 className="text-3xl font-bold text-center text-white">
                        {product.title}
                    </h2>
                    {product.category && (
                        <p className="text-center text-purple-200 mt-2 text-lg">
                            {product.category.name}
                        </p>
                    )}
                </div>
            }
        >
            <Head title={product.title} />
            
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12">
                <div className="mx-auto max-w-6xl px-6 lg:px-8">
                    {/* Success Modal */}
                    {showSuccessModal && (
                        <div className="fixed top-4 right-4 z-50 animate-slide-in">
                            <div className="bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="font-semibold">Added to cart successfully!</span>
                            </div>
                        </div>
                    )}

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Left Column - Images */}
                        <div className="space-y-6">
                            <div className="backdrop-blur-sm bg-white/80 rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                                {product.images && product.images.length > 0 ? (
                                    <div className="space-y-4 p-6">
                                        {/* Main Image */}
                                        <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 group">
                                            <img
                                                src={`/storage/${product.images[selectedImageIndex]}`}
                                                alt={product.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        
                                        {/* Image Thumbnails */}
                                        {product.images.length > 1 && (
                                            <div className="flex gap-3 overflow-x-auto pb-2">
                                                {product.images.map((img, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => setSelectedImageIndex(idx)}
                                                        className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                                                            selectedImageIndex === idx 
                                                                ? 'border-blue-500 shadow-lg scale-105' 
                                                                : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                    >
                                                        <img
                                                            src={`/storage/${img}`}
                                                            alt={`${product.title} ${idx + 1}`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="aspect-square flex items-center justify-center bg-gray-100 m-6 rounded-2xl">
                                        <div className="text-center">
                                            <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <p className="text-gray-500 text-lg">No images available</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Digital Files Section */}
                            {product.is_digital && (
                                <div className="backdrop-blur-sm bg-white/80 rounded-3xl shadow-2xl border border-white/20 p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-800">Digital Files</h3>
                                    </div>
                                    <div className="space-y-3">
                                        {product.demo_file && (
                                            <div className="bg-white/70 rounded-xl p-4 border border-gray-100">
                                                <p className="text-sm text-gray-600 mb-2">Demo File</p>
                                                <a 
                                                    href={`/storage/${product.demo_file}`}
                                                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center group"
                                                    target="_blank"
                                                    rel="noopener"
                                                >
                                                    <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    {product.demo_file}
                                                </a>
                                            </div>
                                        )}
                                        {product.main_file && (
                                            <div className="bg-white/70 rounded-xl p-4 border border-gray-100">
                                                <p className="text-sm text-gray-600 mb-2">Main File</p>
                                                <a 
                                                    href={`/storage/${product.main_file}`}
                                                    className="text-purple-600 hover:text-purple-800 font-medium flex items-center group"
                                                    target="_blank"
                                                    rel="noopener"
                                                >
                                                    <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                    {product.main_file}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Product Details */}
                        <div className="space-y-6">
                            {/* Main Product Info */}
                            <div className="backdrop-blur-sm bg-white/80 rounded-3xl shadow-2xl border border-white/20 p-8">
                                {/* Price Section */}
                                <div className="mb-8">
                                    <div className="flex items-center space-x-4">
                                        <span className={`text-4xl font-bold transition-all duration-300 ${
                                            selected ? 'text-gray-400 line-through' : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'
                                        }`}>
                                            ${product.price}
                                        </span>
                                        {selected && (
                                            <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 animate-fade-in">
                                                ${selectedAttribute?.price}
                                            </span>
                                        )}
                                    </div>
                                    {product.is_digital && (
                                        <div className="flex items-center mt-3">
                                            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                            <span className="text-green-600 font-medium">Digital Product - Instant Download</span>
                                        </div>
                                    )}
                                </div>

                                {/* Description */}
                                {product.description && (
                                    <div className="mb-8">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
                                        <div className="prose prose-gray max-w-none">
                                            <p className="text-gray-600 leading-relaxed">{product.description}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Attributes */}
                                {product.attributes && product.attributes.length > 0 && (
                                    <div className="mb-8">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose an Option</h3>
                                        <div className="grid gap-3">
                                            {product.attributes.map((attr) => (
                                                <button
                                                    key={attr.id}
                                                    onClick={() => addAttributeToCart(attr.id)}
                                                    className={`p-4 rounded-2xl border-2 text-left transition-all duration-300 hover:scale-[1.02] ${
                                                        selected === attr.id
                                                            ? 'border-blue-500 bg-blue-50 shadow-lg'
                                                            : 'border-gray-200 bg-white/70 hover:border-gray-300 hover:shadow-md'
                                                    }`}
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <h4 className="font-semibold text-gray-800">{attr.title}</h4>
                                                            <p className="text-gray-600 text-sm">{attr.option}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <span className="text-xl font-bold text-blue-600">${attr.price}</span>
                                                            {selected === attr.id && (
                                                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1 ml-auto">
                                                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                    </svg>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Add to Cart Button */}
                                {!product.attributes?.length && (
                                    <button
                                        onClick={addToCart}
                                        className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg mb-6 flex items-center justify-center"
                                    >
                                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5M7 13l-1.1 5m0 0h9.1M16 18a2 2 0 11-4 0 2 2 0 014 0zM9 18a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        Add to Cart - ${product.price}
                                    </button>
                                )}

                                {/* Back Button */}
                                <Link
                                    href={route('products.index')}
                                    className="w-full py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-2xl hover:bg-gray-50 hover:scale-105 transition-all duration-300 flex items-center justify-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to Products
                                </Link>
                            </div>

                            {/* Product Features */}
                            <div className="backdrop-blur-sm bg-white/80 rounded-3xl shadow-2xl border border-white/20 p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Features</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                        <span className="text-gray-600">Secure Payment</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                        <span className="text-gray-600">Fast Delivery</span>
                                    </div>
                                    {product.is_digital && (
                                        <div className="flex items-center">
                                            <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                                            <span className="text-gray-600">Instant Download</span>
                                        </div>
                                    )}
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                                        <span className="text-gray-600">24/7 Support</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes slide-in {
                    from { opacity: 0; transform: translateX(100px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out;
                }
                
                .animate-slide-in {
                    animation: slide-in 0.3s ease-out;
                }
            `}</style>
        </AuthenticatedLayout>
    );
}
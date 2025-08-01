import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import AddToCartPrompt from '@/Components/AddToCartPrompt';
import ReviewForm from '@/Components/ReviewForm';
import ReviewList from '@/Components/ReviewList';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReportModal from '@/Components/ReportModal';

export default function Show({ product }) {
    const { t } = useTranslation();
    const [selected, setSelected] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showCartPrompt, setShowCartPrompt] = useState(false);
    const [showReport, setShowReport] = useState(false);
    const [reviews, setReviews] = useState([]);

    const addAttributeToCart = (id) => {
        router.post(route('cart.add', product.slug), { attribute_id: id }, {
            onSuccess: () => {
                setShowSuccessModal(true);
                setTimeout(() => setShowSuccessModal(false), 3000);
                setShowCartPrompt(true);
            },
        });
        setSelected(id);
    };

    const addToCart = () => {
        router.post(route('cart.add', product.slug), {}, {
            onSuccess: () => {
                setShowSuccessModal(true);
                setTimeout(() => setShowSuccessModal(false), 3000);
                setShowCartPrompt(true);
            },
        });
    };

    const selectedAttribute = product.attributes?.find(attr => attr.id === selected);
    const currentPrice = selected ? selectedAttribute?.price : product.price;
    const isSuspended = Boolean(product.user.suspended_at);

    if (isSuspended) {
        return (
            <GuestLayout>
                <Head title={product.title} />
                <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold">
                    This user is suspended.
                </div>
            </GuestLayout>
        );
    }

    return (
        <GuestLayout>
            <Head title={product.title} />
            
            {/* Success Toast */}
            {showSuccessModal && (
                <div className="fixed top-6 right-6 z-50 animate-slideIn">
                    <div className="bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">{t('Added to cart!')}</span>
                    </div>
                </div>
            )}

            <div className="min-h-screen bg-gray-50">
                {/* Header Section */}
                <div className="bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 py-8">
                        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                            <Link href={route('products.index')} className="hover:text-gray-900 transition-colors">
                                {t('Products')}
                            </Link>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            {product.category && (
                                <>
                                    <span className="hover:text-gray-900 transition-colors">{product.category.name}</span>
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </>
                            )}
                            <span className="text-gray-900">{product.title}</span>
                        </nav>

                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    {product.category && (
                                        <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-600">
                                            {product.category.name}
                                        </span>
                                    )}
                                    {product.is_digital && (
                                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-medium">
                                            {t('Digital Product')}
                                        </span>
                                    )}
                                    {product.is_voucher && (
                                        <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full font-medium">
                                            {t('Voucher Product')}
                                        </span>
                                    )}
                                    <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                        </svg>
                                        <span>{product.views} {t('views')}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold text-gray-900 mb-1">
                                    ${selected ? selectedAttribute?.price : product.price}
                                </div>
                                {selected && (
                                    <div className="text-sm text-gray-500 line-through">
                                        Was ${product.price}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Image Gallery */}
                        <div className="space-y-6">
                            {product.images && product.images.length > 0 ? (
                                <>
                                    {/* Main Image */}
                                    <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                                        <img
                                            src={`/storage/${product.images[selectedImageIndex]}`}
                                            alt={product.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    
                                    {/* Thumbnails */}
                                    {product.images.length > 1 && (
                                        <div className="flex gap-4 overflow-x-auto pb-2">
                                            {product.images.map((img, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setSelectedImageIndex(idx)}
                                                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
                                                        selectedImageIndex === idx 
                                                            ? 'ring-2 ring-gray-900 ring-offset-2' 
                                                            : 'ring-1 ring-gray-200 hover:ring-gray-300'
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
                                </>
                            ) : (
                                <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center">
                                    <div className="text-center">
                                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                        </svg>
                                        <p className="text-gray-500">{t('No image available')}</p>
                                    </div>
                                </div>
                            )}

                            {/* Digital Files */}
                            {product.is_digital && (product.demo_file || product.main_file) && (
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <h3 className="font-semibold text-gray-900 mb-4">{t('Files')}</h3>
                                    <div className="space-y-3">
                                        {product.demo_file && (
                                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <div>
                                                    <p className="font-medium text-gray-900">{t('Demo File')}</p>
                                                    <p className="text-sm text-gray-500">{product.demo_file}</p>
                                                </div>
                                                <a 
                                                    href={`/storage/${product.demo_file}`}
                                                    className="text-blue-600 hover:text-blue-700 transition-colors"
                                                    target="_blank"
                                                    rel="noopener"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                    </svg>
                                                </a>
                                            </div>
                                        )}
                                        {product.main_file && (
                                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <div>
                                                    <p className="font-medium text-gray-900">{t('Main File')}</p>
                                                    <p className="text-sm text-gray-500">{product.main_file}</p>
                                                </div>
                                                <a 
                                                    href={`/storage/${product.main_file}`}
                                                    className="text-blue-600 hover:text-blue-700 transition-colors"
                                                    target="_blank"
                                                    rel="noopener"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                    </svg>
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Product Details */}
                        <div className="space-y-8">
                            {/* Description */}
                            {product.description && (
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('Description')}</h2>
                                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                                </div>
                            )}

                            {/* Attributes */}
                            {product.attributes && product.attributes.length > 0 && (
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('Choose an Option')}</h2>
                                    <div className="space-y-3">
                                        {product.attributes.map((attr) => (
                                            <button
                                                key={attr.id}
                                                onClick={() => addAttributeToCart(attr.id)}
                                                className={`w-full p-4 rounded-xl border text-left transition-all hover:shadow-sm ${
                                                    selected === attr.id
                                                        ? 'border-gray-900 bg-gray-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <h3 className="font-medium text-gray-900">{attr.title}</h3>
                                                        <p className="text-sm text-gray-500">{attr.option}</p>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="font-semibold text-gray-900">${attr.price}</span>
                                                        {selected === attr.id && (
                                                            <div className="w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center">
                                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
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

                            {/* Add to Cart */}
                            <div className="space-y-4">
                                <button
                                    onClick={addToCart}
                                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.15M7 13l-1.1 5m0 0h9.1M16 18a2 2 0 11-4 0 2 2 0 014 0zM9 18a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    {t('Add to Cart')} • ${currentPrice}
                                </button>

                                <Link
                                    href={route('products.index')}
                                    className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    {t('Continue Shopping')}
                                </Link>

                                <button
                                    type="button"
                                    onClick={() => setShowReport(true)}
                                    className="w-full border border-red-300 hover:border-red-400 text-red-600 font-medium py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728" />
                                    </svg>
                                    {t('Report Store')}
                                </button>
                            </div>

                            {/* Features */}
                            <div className="bg-gray-50 rounded-2xl p-6">
                                <h3 className="font-semibold text-gray-900 mb-4">{t("What's Included")}</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-gray-700">{t('Secure Payment Processing')}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-gray-700">{t('Fast & Reliable Delivery')}</span>
                                    </div>
                                    {product.is_digital && (
                                        <div className="flex items-center gap-3">
                                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-700">{t('Instant Download Access')}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-gray-700">{t('24/7 Customer Support')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="max-w-4xl mx-auto px-4 py-12">
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('Customer Reviews')}</h2>
                        <div className="space-y-8">
                            <ReviewForm 
                                productId={product.slug} 
                                onCreated={(r) => setReviews([r, ...reviews])} 
                            />
                            <ReviewList productId={product.slug} />
                        </div>
                    </div>
                </div>
            </div>

            <AddToCartPrompt
                show={showCartPrompt}
                onClose={() => setShowCartPrompt(false)}
                onGoToCart={() => router.visit(route('cart.show'))}
            />

            <ReportModal userId={product.user.username} show={showReport} onClose={() => setShowReport(false)} />

            <style jsx>{`
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateX(100px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                .animate-slideIn {
                    animation: slideIn 0.3s ease-out;
                }
            `}</style>
        </GuestLayout>
    );
}
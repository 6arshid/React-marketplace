import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function TrackForm() {
    const { t } = useTranslation();
    const { data, setData, get, processing, errors } = useForm({
        code: '',
    });
    
    const [isHovered, setIsHovered] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        if (!data.code) return;
        get(route('orders.track', data.code));
    };

    return (
        <GuestLayout>
            <Head title={t('Track Order')} />
            
            {/* Background with gradient and animated particles - Mobile Responsive */}
            <div className="min-h-screen relative overflow-hidden">
                {/* Animated background elements - Scaled for mobile */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-r from-indigo-400/20 to-pink-400/20 rounded-full blur-2xl sm:blur-3xl animate-pulse animation-delay-2000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-2xl sm:blur-3xl animate-pulse animation-delay-4000"></div>
                </div>

                <div className="flex min-h-screen items-center justify-center p-3 sm:p-6 relative z-10">
                    <div className="w-full max-w-sm sm:max-w-md">
                        {/* Header section - Mobile Responsive */}
                        <div className="text-center mb-6 sm:mb-8">
                            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 shadow-lg">
                                <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent px-4">
                                {t('Track Your Order')}
                            </h1>
                            <p className="text-gray-500 mt-2 text-sm sm:text-base px-4">{t('Enter your tracking code to get real-time updates')}</p>
                        </div>

                        {/* Main form card - Mobile Responsive */}
                        <div 
                            className={`bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl sm:shadow-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-all duration-500 ${
                                isHovered ? 'sm:shadow-3xl sm:scale-[1.02]' : ''
                            }`}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <form onSubmit={submit} className="space-y-5 sm:space-y-6">
                                <div className="space-y-2">
                                    <InputLabel
                                        htmlFor="code"
                                        value={t('Tracking Code')}
                                        className="text-sm font-semibold text-gray-700"
                                    />
                                    
                                    <div className="relative group">
                                        <TextInput
                                            id="code"
                                            className="mt-1 block w-full px-3 sm:px-4 py-3 sm:py-4 bg-gray-50/50 border border-gray-200 rounded-xl sm:rounded-2xl focus:ring-2 sm:focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-base sm:text-lg placeholder-gray-400 group-hover:bg-gray-50"
                                            value={data.code}
                                            placeholder={t('Enter your tracking code...')}
                                            isFocused
                                            onChange={(e) => setData('code', e.target.value)}
                                        />
                                        
                                        {/* Input decoration - Mobile Responsive */}
                                        <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 pointer-events-none opacity-30 group-focus-within:opacity-60 transition-opacity">
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    
                                    <InputError message={errors.code} className="mt-2 text-sm" />
                                </div>

                                <div className="pt-2">
                                    <PrimaryButton 
                                        disabled={processing || !data.code}
                                        className={`w-full py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base ${
                                            processing ? 'animate-pulse' : ''
                                        }`}
                                    >
                                        {processing ? (
                                            <div className="flex items-center justify-center space-x-2">
                                                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                <span>{t('Tracking...')}</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center space-x-2">
                                                <span>{t('Track Order')}</span>
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </div>
                                        )}
                                    </PrimaryButton>
                                </div>
                            </form>

                            {/* Help text - Mobile Responsive */}
                            <div className="mt-6 text-center">
                                <p className="text-xs sm:text-sm text-gray-500">
                                    {t('Tracking code format: ABC123456')}
                                </p>
                                <div className="mt-3 sm:mt-4">
                                    <a 
                                        href="/help" 
                                        className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-500 transition-colors font-medium"
                                    >
                                        {t('Need help finding your tracking code?')}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Additional info - Mobile Responsive */}
                        <div className="mt-6 sm:mt-8 text-center">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                                <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <span className="text-xs sm:text-sm font-medium text-gray-700">{t('Real-time')}</span>
                                        <span className="text-xs text-gray-500">{t('Updates')}</span>
                                    </div>
                                </div>

                                <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <span className="text-xs sm:text-sm font-medium text-gray-700">{t('Secure')}</span>
                                        <span className="text-xs text-gray-500">{t('Tracking')}</span>
                                    </div>
                                </div>

                                <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 border border-white/20 sm:col-span-1">
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                                            </svg>
                                        </div>
                                        <span className="text-xs sm:text-sm font-medium text-gray-700">{t('Download')}</span>
                                        <span className="text-xs text-gray-500">{t('Files')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .animation-delay-1000 {
                    animation-delay: 1s;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                .shadow-3xl {
                    box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.15);
                }
                
                @media (max-width: 640px) {
                    .shadow-3xl {
                        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                    }
                }
            `}</style>
        </GuestLayout>
    );
}
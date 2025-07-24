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
            
            {/* Background with gradient and animated particles */}
            <div className="min-h-screen relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
                </div>

                <div className="flex min-h-screen items-center justify-center p-6 relative z-10">
                    <div className="w-full max-w-md">
                        {/* Header section */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                {t('Track Your Order')}
                            </h1>
                            <p className="text-gray-500 mt-2">{t('Enter your tracking code to get real-time updates')}</p>
                        </div>

                        {/* Main form card */}
                        <div 
                            className={`bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 transition-all duration-500 ${
                                isHovered ? 'shadow-3xl scale-[1.02]' : ''
                            }`}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <form onSubmit={submit} className="space-y-6">
                                <div className="space-y-2">
                                    <InputLabel
                                        htmlFor="code"
                                        value={t('Tracking Code')}
                                        className="text-sm font-semibold text-gray-700"
                                    />
                                    
                                    <div className="relative group">
                                        <TextInput
                                            id="code"
                                            className="mt-1 block w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-lg placeholder-gray-400 group-hover:bg-gray-50"
                                            value={data.code}
                                            placeholder={t('Enter your tracking code...')}
                                            isFocused
                                            onChange={(e) => setData('code', e.target.value)}
                                        />
                                        
                                        {/* Input decoration */}
                                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none opacity-30 group-focus-within:opacity-60 transition-opacity">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    
                                    <InputError message={errors.code} className="mt-2 text-sm" />
                                </div>

                                <div className="pt-2">
                                    <PrimaryButton 
                                        disabled={processing || !data.code}
                                        className={`w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                                            processing ? 'animate-pulse' : ''
                                        }`}
                                    >
                                        {processing ? (
                                            <div className="flex items-center justify-center space-x-2">
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                <span>{t('Tracking...')}</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center space-x-2">
                                                <span>{t('Track Order')}</span>
                                                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </div>
                                        )}
                                    </PrimaryButton>
                                </div>
                            </form>
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
            `}</style>
        </GuestLayout>
    );
}
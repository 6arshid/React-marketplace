import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import axios from 'axios';

export default function Index({ items, total, seller, requires_shipping }) {
    const [step, setStep] = useState(1);

    const { data, setData } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        postal_code: '',
        phone: '',
        buyer_wallet: '',
    });

    const baseMessage =
        items
            .map((i) => `${i.product_title}${i.attribute ? ` (${i.attribute})` : ''} - $${i.price}`)
            .join('\n') + `\nTotal: $${total}`;

    const shippingMessage = requires_shipping
        ? `\nName: ${data.first_name} ${data.last_name}\nEmail: ${data.email}\nAddress: ${data.address}\nPostal Code: ${data.postal_code}\nPhone: ${data.phone}`
        : '';

    const message = encodeURIComponent(baseMessage + shippingMessage);

    const whatsappUrl = seller?.pro_panel && seller.whatsapp_number
        ? `https://wa.me/${seller.whatsapp_number}?text=${message}`
        : `https://wa.me/?text=${message}`;

    const telegramUrl = seller?.pro_panel && seller.telegram_username
        ? `https://t.me/${seller.telegram_username}?text=${message}`
        : `https://t.me/share/url?url=&text=${message}`;

    const mailUrl = seller?.pro_panel && seller.public_email
        ? `mailto:${seller.public_email}?subject=Order&body=${message}`
        : `mailto:?subject=Order&body=${message}`;

    const checkout = async (paymentMethod = 'crypto') => {
        const payload = requires_shipping ? data : { buyer_wallet: data.buyer_wallet };
        const res = await axios.post(route('cart.checkout'), {
            ...payload,
            payment_method: paymentMethod,
        });
        window.location.href = res.data.url;
    };

    const StepIndicator = () => (
        <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                    <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                            step >= stepNumber
                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                                : 'bg-gray-200 text-gray-600'
                        }`}
                    >
                        {stepNumber}
                    </div>
                    {stepNumber < 3 && (
                        <div
                            className={`w-16 h-1 mx-2 transition-all duration-300 ${
                                step > stepNumber ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-200'
                            }`}
                        />
                    )}
                </div>
            ))}
        </div>
    );

    return (
        <AuthenticatedLayout 
            header={
                <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 py-8">
                    <h2 className="text-3xl font-bold text-center text-white">
                        Shopping Cart
                    </h2>
                </div>
            }
        >
            <Head title="Cart" />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12">
                <div className="mx-auto max-w-4xl px-6 lg:px-8">
                    <div className="backdrop-blur-sm bg-white/80 rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                        <div className="p-8">
                            <StepIndicator />
                            
                            {/* Step 1: Cart Items */}
                            {step === 1 && (
                                <div className="space-y-6 animate-fade-in">
                                    <div className="text-center">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Review Your Order</h3>
                                        <p className="text-gray-600">Check your items before proceeding</p>
                                    </div>
                                    
                                    {items.length ? (
                                        <div className="space-y-4">
                                            {items.map((item, idx) => (
                                                <div
                                                    key={idx}
                                                    className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <h4 className="font-semibold text-gray-800 text-lg">
                                                                {item.product_title}
                                                            </h4>
                                                            {item.attribute && (
                                                                <p className="text-gray-600 mt-1">
                                                                    Variant: {item.attribute}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                                                ${item.price}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            
                                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xl font-semibold">Total Amount</span>
                                                    <span className="text-3xl font-bold">${total}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-12">
                                            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5M7 13l-1.1 5m0 0h9.1M16 18a2 2 0 11-4 0 2 2 0 014 0zM9 18a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </div>
                                            <p className="text-xl text-gray-600">Your cart is empty</p>
                                            <p className="text-gray-500 mt-2">Add some items to get started</p>
                                        </div>
                                    )}
                                    
                                    {items.length > 0 && (
                                        <div className="text-center pt-6">
                                            <button
                                                onClick={() => setStep(2)}
                                                className="px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg"
                                            >
                                                Continue to {requires_shipping ? 'Shipping' : 'Payment'}
                                                <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Step 2: Shipping Information */}
                            {step === 2 && items.length > 0 && (
                                <div className="space-y-6 animate-fade-in">
                                    <div className="text-center">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                                            {requires_shipping ? 'Shipping Information' : 'Almost There!'}
                                        </h3>
                                        <p className="text-gray-600">
                                            {requires_shipping ? 'Please provide your delivery details' : 'Ready to proceed to payment'}
                                        </p>
                                    </div>

                                    {requires_shipping ? (
                                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-100">
                                            <div className="grid gap-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <InputLabel htmlFor="first_name" value="First Name" className="text-gray-700 font-medium" />
                                                        <TextInput
                                                            id="first_name"
                                                            className="w-full rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                                                            value={data.first_name}
                                                            onChange={(e) => setData('first_name', e.target.value)}
                                                            placeholder="Enter your first name"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <InputLabel htmlFor="last_name" value="Last Name" className="text-gray-700 font-medium" />
                                                        <TextInput
                                                            id="last_name"
                                                            className="w-full rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                                                            value={data.last_name}
                                                            onChange={(e) => setData('last_name', e.target.value)}
                                                            placeholder="Enter your last name"
                                                        />
                                                    </div>
                                                </div>
                                                
                                                <div className="space-y-2">
                                                    <InputLabel htmlFor="email" value="Email Address" className="text-gray-700 font-medium" />
                                                    <TextInput
                                                        id="email"
                                                        type="email"
                                                        className="w-full rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                                                        value={data.email}
                                                        onChange={(e) => setData('email', e.target.value)}
                                                        placeholder="your.email@example.com"
                                                    />
                                                </div>
                                                
                                                <div className="space-y-2">
                                                    <InputLabel htmlFor="address" value="Full Address" className="text-gray-700 font-medium" />
                                                    <TextInput
                                                        id="address"
                                                        className="w-full rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                                                        value={data.address}
                                                        onChange={(e) => setData('address', e.target.value)}
                                                        placeholder="Street address, city, state"
                                                    />
                                                </div>
                                                
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <InputLabel htmlFor="postal_code" value="Postal Code" className="text-gray-700 font-medium" />
                                                        <TextInput
                                                            id="postal_code"
                                                            className="w-full rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                                                            value={data.postal_code}
                                                            onChange={(e) => setData('postal_code', e.target.value)}
                                                            placeholder="12345"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <InputLabel htmlFor="phone" value="Phone Number" className="text-gray-700 font-medium" />
                                                        <TextInput
                                                            id="phone"
                                                            className="w-full rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                                                            value={data.phone}
                                                            onChange={(e) => setData('phone', e.target.value)}
                                                            placeholder="+1 (555) 123-4567"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-12">
                                            <div className="w-24 h-24 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                                                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <p className="text-xl text-gray-700">No shipping required</p>
                                            <p className="text-gray-500 mt-2">Digital products will be delivered instantly</p>
                                        </div>
                                    )}

                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <button
                                            onClick={() => setStep(1)}
                                            className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-2xl hover:bg-gray-50 hover:scale-105 transition-all duration-300"
                                        >
                                            <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                            Back to Cart
                                        </button>
                                        <button
                                            onClick={() => setStep(3)}
                                            className="px-12 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300"
                                        >
                                            Continue to Payment
                                            <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Payment */}
                            {step === 3 && items.length > 0 && (
                                <div className="space-y-6 animate-fade-in">
                                    <div className="text-center">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Payment Options</h3>
                                        <p className="text-gray-600">Choose your preferred payment method</p>
                                    </div>

                                    {/* Crypto Payment Options */}
                                    {(seller?.trc20_usdt_wallet || seller?.bitcoin_wallet) && (
                                        <div className="grid md:grid-cols-2 gap-6">
                                            {seller?.trc20_usdt_wallet && (
                                                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
                                                    <div className="text-center">
                                                        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                                                            <span className="text-green-600 font-bold text-lg">₮</span>
                                                        </div>
                                                        <h4 className="font-semibold text-gray-800 mb-2">USDT Payment</h4>
                                                        <p className="text-3xl font-bold text-green-600 mb-4">${total}</p>
                                                        <div className="bg-white p-4 rounded-xl border-2 border-gray-100">
                                                            <QRCodeSVG value={`${seller.trc20_usdt_wallet}-${total}`} size={200} className="mx-auto mb-4" />
                                                            <p className="text-xs text-gray-600 break-all bg-gray-50 p-2 rounded-lg">
                                                                {seller.trc20_usdt_wallet}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {seller?.bitcoin_wallet && (
                                                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
                                                    <div className="text-center">
                                                        <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                                                            <span className="text-orange-600 font-bold text-lg">₿</span>
                                                        </div>
                                                        <h4 className="font-semibold text-gray-800 mb-2">Bitcoin Payment</h4>
                                                        <p className="text-3xl font-bold text-orange-600 mb-4">${total}</p>
                                                        <div className="bg-white p-4 rounded-xl border-2 border-gray-100">
                                                            <QRCodeSVG value={`${seller.bitcoin_wallet}-${total}`} size={200} className="mx-auto mb-4" />
                                                            <p className="text-xs text-gray-600 break-all bg-gray-50 p-2 rounded-lg">
                                                                {seller.bitcoin_wallet}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Wallet Input */}
                                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
                                        <h4 className="font-semibold text-gray-800 mb-4 text-center">Your Transaction Details</h4>
                                        <div className="flex gap-3">
                                            <TextInput
                                                id="buyer_wallet"
                                                placeholder="Enter your wallet address for confirmation"
                                                className="flex-1 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                                                value={data.buyer_wallet}
                                                onChange={(e) => setData('buyer_wallet', e.target.value)}
                                            />
                                            <button
                                                onClick={() => checkout('crypto')}
                                                className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
                                            >
                                                Submit Order
                                            </button>
                                        </div>
                                    </div>

                                    {/* Contact Options */}
                                    {seller?.pro_panel && (
                                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
                                            <h4 className="font-semibold text-gray-800 mb-4 text-center">Contact Seller</h4>
                                            <div className="flex flex-wrap justify-center gap-4">
                                                <a
                                                    href={whatsappUrl}
                                                    target="_blank"
                                                    rel="noopener"
                                                    className="flex items-center px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 hover:scale-105 transition-all duration-300"
                                                >
                                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                                                    </svg>
                                                    WhatsApp
                                                </a>
                                                <a
                                                    href={telegramUrl}
                                                    target="_blank"
                                                    rel="noopener"
                                                    className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 hover:scale-105 transition-all duration-300"
                                                >
                                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                                                    </svg>
                                                    Telegram
                                                </a>
                                                <a
                                                    href={mailUrl}
                                                    className="flex items-center px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 hover:scale-105 transition-all duration-300"
                                                >
                                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                    Email
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                    {/* Stripe Payment */}
                                    <div className="text-center">
                                        <button
                                            onClick={() => checkout('stripe')}
                                            className="px-16 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg"
                                        >
                                            <svg className="w-6 h-6 mr-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                            </svg>
                                            Pay ${total} with Stripe
                                        </button>
                                    </div>

                                    <div className="text-center">
                                        <button
                                            onClick={() => setStep(2)}
                                            className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-2xl hover:bg-gray-50 hover:scale-105 transition-all duration-300"
                                        >
                                            <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                            Back to {requires_shipping ? 'Shipping' : 'Previous Step'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out;
                }
            `}</style>
        </AuthenticatedLayout>
    );
}
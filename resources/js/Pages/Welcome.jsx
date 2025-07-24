import { Head, Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { useState, useEffect } from 'react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const settings = usePage().props.settings || {};
    const [scrollY, setScrollY] = useState(0);
    const [currentFeature, setCurrentFeature] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFeature((prev) => (prev + 1) % features.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const features = [
        {
            title: "Custom Profile URLs",
            description: "Build your online store with your own profile at /username",
            icon: "🏪",
            gradient: "from-purple-500 to-pink-500"
        },
        {
            title: "Crypto Payments",
            description: "Accept Bitcoin & USDT (TRC20) with instant transactions",
            icon: "₿",
            gradient: "from-orange-500 to-yellow-500"
        },
        {
            title: "Multi-Channel Orders",
            description: "Customers can order via WhatsApp, Telegram, or Email",
            icon: "📱",
            gradient: "from-green-500 to-teal-500"
        },
        {
            title: "Visual Categories",
            description: "Organize products with beautiful photo-based categories",
            icon: "📸",
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            title: "Order Management",
            description: "Track orders and manage transactions effortlessly",
            icon: "📊",
            gradient: "from-violet-500 to-purple-500"
        }
    ];

    const paymentMethods = [
        { name: "Bitcoin", icon: "₿", color: "text-orange-400" },
        { name: "USDT TRC20", icon: "₮", color: "text-green-400" },
        { name: "Traditional", icon: "💳", color: "text-blue-400" }
    ];

    const messagingChannels = [
        { name: "WhatsApp", icon: "📱", color: "text-green-400" },
        { name: "Telegram", icon: "✈️", color: "text-blue-400" },
        { name: "Email", icon: "📧", color: "text-red-400" }
    ];

    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 hidden md:block">
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                            backgroundSize: '60px 60px'
                        }}></div>
                    </div>
                    
                    {/* Floating Elements */}
                    <div className="absolute top-20 left-10 w-48 h-48 md:w-72 md:h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                    <div className="absolute top-40 right-10 w-48 h-48 md:w-72 md:h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
                    <div className="absolute -bottom-32 left-20 w-48 h-48 md:w-72 md:h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
                </div>

                {/* Header */}
                <header className="relative z-10 px-4 py-6 md:px-6 md:py-8">
                    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                            <div className="relative">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center transform rotate-3 hover:rotate-6 transition-transform duration-300">
                                    <ApplicationLogo className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-cyan-400 rounded-full animate-ping"></div>
                            </div>
                            <div>
                                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                    {import.meta.env.VITE_APP_NAME}
                                </h1>
                                <p className="text-xs text-gray-400">{settings.welcome_tagline || "Your Store, Your Way"}</p>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="flex items-center space-x-2 md:space-x-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full font-semibold text-sm md:text-base text-white hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <div className="flex items-center space-x-2 md:space-x-3">
                                    <Link
                                        href={route('login')}
                                        className="px-4 py-2 md:px-6 md:py-3 text-gray-300 hover:text-white border border-gray-600 hover:border-gray-400 rounded-full transition-all duration-300 hover:bg-white/5 text-sm md:text-base"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full font-semibold text-sm md:text-base text-white hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300"
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="relative z-10 px-4 md:px-6">
                    <div className="max-w-7xl mx-auto">
                        {/* Hero Content */}
                        <div className="text-center py-12 md:py-20">
                            <div className="inline-flex items-center px-3 py-1 md:px-4 md:py-2 bg-white/10 backdrop-blur-sm rounded-full text-xs md:text-sm text-gray-300 mb-6 md:mb-8 border border-white/20">
                                <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                                Now with Crypto Payments & Multi-Channel Orders
                            </div>
                            
                            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 md:mb-8 leading-tight">
                                <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                                    Your Store
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                    Your Rules
                                </span>
                            </h1>
                            
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
                                Create a professional online store with custom profiles, crypto payments, and multi-channel ordering. 
                                <span className="text-purple-300"> Accept Bitcoin & USDT (TRC20)</span> and let customers order via 
                                <span className="text-green-300"> WhatsApp, Telegram, or Email</span>.
                            </p>

                            {/* Payment Methods & Messaging Channels */}
                            <div className="flex flex-col gap-6 md:gap-8 justify-center items-center mb-8 md:mb-12">
                                <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4">
                                    <span className="text-gray-400 text-xs md:text-sm">Accept:</span>
                                    {paymentMethods.map((method, index) => (
                                        <div key={index} className="flex items-center space-x-2 px-2 py-1 md:px-3 md:py-2 bg-white/5 rounded-lg border border-white/10">
                                            <span className={`text-base md:text-lg ${method.color}`}>{method.icon}</span>
                                            <span className="text-xs md:text-sm text-gray-300">{method.name}</span>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4">
                                    <span className="text-gray-400 text-xs md:text-sm">Orders via:</span>
                                    {messagingChannels.map((channel, index) => (
                                        <div key={index} className="flex items-center space-x-2 px-2 py-1 md:px-3 md:py-2 bg-white/5 rounded-lg border border-white/10">
                                            <span className={`text-base md:text-lg ${channel.color}`}>{channel.icon}</span>
                                            <span className="text-xs md:text-sm text-gray-300">{channel.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-12 md:mb-16">
                                <a href="/register" className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full font-semibold text-base md:text-lg hover:shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 min-w-[180px] md:min-w-[200px]">
                                    Start Building
                                </a>
                                <a href="/demo" className="px-6 py-3 md:px-8 md:py-4 border border-gray-400 hover:border-white text-gray-300 hover:text-white rounded-full font-semibold text-base md:text-lg transition-all duration-300 hover:bg-white/5 min-w-[180px] md:min-w-[200px]">
                                    Watch Demo
                                </a>
                            </div>
                        </div>

                        {/* Features Carousel */}
                        <div className="relative py-12 md:py-20">
                            <div className="max-w-4xl mx-auto">
                                <div className="relative overflow-hidden">
                                    <div 
                                        className="flex transition-transform duration-1000 ease-in-out"
                                        style={{ transform: `translateX(-${currentFeature * 100}%)` }}
                                    >
                                        {features.map((feature, index) => (
                                            <div key={index} className="w-full flex-shrink-0 px-4 md:px-8">
                                                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105">
                                                    <div className="text-center">
                                                        <div className={`text-5xl md:text-6xl mb-4 md:mb-6 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                                                            {feature.icon}
                                                        </div>
                                                        <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white">{feature.title}</h3>
                                                        <p className="text-gray-300 text-base md:text-lg leading-relaxed">{feature.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Indicators */}
                                <div className="flex justify-center mt-6 md:mt-8 space-x-2">
                                    {features.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentFeature(index)}
                                            className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                                                index === currentFeature 
                                                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500 w-6 md:w-8' 
                                                    : 'bg-white/30 hover:bg-white/50'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div className="py-12 md:py-20">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
                                {[
                                    { number: "2%", label: "Commission", subtext: "For free plan" },
                                    { number: "3", label: "Crypto Types", subtext: "Bitcoin & USDT TRC20" },
                                    { number: "3", label: "Order Channels", subtext: "WhatsApp, Telegram, Email" },
                                    { number: "∞", label: "Customization", subtext: "Unlimited possibilities" }
                                ].map((stat, index) => (
                                    <div key={index} className="text-center group">
                                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105">
                                            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                                                {stat.number}
                                            </div>
                                            <div className="text-lg md:text-xl font-semibold text-white mb-2">{stat.label}</div>
                                            <div className="text-gray-400 text-xs md:text-sm">{stat.subtext}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Feature Highlights */}
                        <div className="py-12 md:py-20">
                            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                Everything You Need to Succeed
                            </h2>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                {[
                                    {
                                        title: "Custom Profile URLs",
                                        description: "Get your unique /username profile for professional branding",
                                        icon: "🔗"
                                    },
                                    {
                                        title: "Crypto Payments",
                                        description: "Accept Bitcoin & USDT (TRC20) with instant verification",
                                        icon: "₿"
                                    },
                                    {
                                        title: "Multi-Channel Orders",
                                        description: "Let customers order via WhatsApp, Telegram, or Email",
                                        icon: "📞"
                                    },
                                    {
                                        title: "Visual Categories",
                                        description: "Organize products with beautiful photo-based categories",
                                        icon: "🖼️"
                                    },
                                    {
                                        title: "Order Tracking",
                                        description: "Track and manage all your orders in one dashboard",
                                        icon: "📦"
                                    },
                                    {
                                        title: "Zero Fees",
                                        description: "No commissions, no hidden costs - keep all your profits for pro profiles",
                                        icon: "💰"
                                    }
                                ].map((item, index) => (
                                    <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 md:p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                                        <div className="text-2xl md:text-3xl mb-3 md:mb-4">{item.icon}</div>
                                        <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">{item.title}</h3>
                                        <p className="text-gray-300 text-sm md:text-base leading-relaxed">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
                        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                            <div className="text-gray-400 text-xs md:text-sm mb-4 md:mb-0">
                                {settings.welcome_footer_text || `Built with ❤️ using Laravel v${laravelVersion} & PHP v${phpVersion}`}
                            </div>
                            <div className="flex flex-wrap justify-center space-x-4 md:space-x-6 text-gray-400 text-xs md:text-sm">
                                <a href={settings.footer_privacy_url || '#'} className="hover:text-white transition-colors duration-300">Privacy</a>
                                <a href={settings.footer_terms_url || '#'} className="hover:text-white transition-colors duration-300">Terms</a>
                                <a href={settings.footer_support_url || '#'} className="hover:text-white transition-colors duration-300">Support</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
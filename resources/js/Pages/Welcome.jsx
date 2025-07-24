import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
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
                <div className="absolute inset-0">
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                            backgroundSize: '60px 60px'
                        }}></div>
                    </div>
                    
                    {/* Floating Elements */}
                    <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                    <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
                    <div className="absolute -bottom-32 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
                </div>

                {/* Header */}
                <header className="relative z-10 px-6 py-8">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center transform rotate-3 hover:rotate-6 transition-transform duration-300">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        viewBox="0 0 62 65"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M61.8548 14.6253C61.8778 14.7102 61.8895 14.7978 61.8897 14.8858V28.5615C61.8898 28.737 61.8434 28.9095 61.7554 29.0614C61.6675 29.2132 61.5409 29.3392 61.3887 29.4265L49.9104 36.0351V49.1337C49.9104 49.4902 49.7209 49.8192 49.4118 49.9987L25.4519 63.7916C25.3971 63.8227 25.3372 63.8427 25.2774 63.8639C25.255 63.8714 25.2338 63.8851 25.2101 63.8913C25.0426 63.9354 24.8666 63.9354 24.6991 63.8913C24.6716 63.8838 24.6467 63.8689 24.6205 63.8589C24.5657 63.8389 24.5084 63.8215 24.456 63.7916L0.501061 49.9987C0.348882 49.9113 0.222437 49.7853 0.134469 49.6334C0.0465019 49.4816 0.000120578 49.3092 0 49.1337L0 8.10652C0 8.01678 0.0124642 7.92953 0.0348998 7.84477C0.0423783 7.8161 0.0598282 7.78993 0.0697995 7.76126C0.0884958 7.70891 0.105946 7.65531 0.133367 7.6067C0.152063 7.5743 0.179485 7.54812 0.20192 7.51821C0.230588 7.47832 0.256763 7.43719 0.290416 7.40229C0.319084 7.37362 0.356476 7.35243 0.388883 7.32751C0.425029 7.29759 0.457436 7.26518 0.498568 7.2415L12.4779 0.345059C12.6296 0.257786 12.8015 0.211853 12.9765 0.211853C13.1515 0.211853 13.3234 0.257786 13.475 0.345059L25.4531 7.2415H25.4556C25.4955 7.26643 25.5292 7.29759 25.5653 7.32626C25.5977 7.35119 25.6339 7.37362 25.6625 7.40104C25.6974 7.43719 25.7224 7.47832 25.7523 7.51821C25.7735 7.54812 25.8021 7.5743 25.8196 7.6067C25.8483 7.65656 25.8645 7.70891 25.8844 7.76126C25.8944 7.78993 25.9118 7.8161 25.9193 7.84602C25.9423 7.93096 25.954 8.01853 25.9542 8.10652V33.7317L35.9355 27.9844V14.8846C35.9355 14.7973 35.948 14.7088 35.9704 14.6253C35.9792 14.5954 35.9954 14.5692 36.0053 14.5405C36.0253 14.4882 36.0427 14.4346 36.0702 14.386C36.0888 14.3536 36.1163 14.3274 36.1375 14.2975C36.1674 14.2576 36.1923 14.2165 36.2272 14.1816C36.2559 14.1529 36.292 14.1317 36.3244 14.1068C36.3618 14.0769 36.3942 14.0445 36.4341 14.0208L48.4147 7.12434C48.5663 7.03694 48.7383 6.99094 48.9133 6.99094C49.0883 6.99094 49.2602 7.03694 49.4118 7.12434L61.3899 14.0208C61.4323 14.0457 61.4647 14.0769 61.5021 14.1055C61.5333 14.1305 61.5694 14.1529 61.5981 14.1803C61.633 14.2165 61.6579 14.2576 61.6878 14.2975C61.7103 14.3274 61.7377 14.3536 61.7551 14.386C61.7838 14.4346 61.8 14.4882 61.8199 14.5405C61.8312 14.5692 61.8474 14.5954 61.8548 14.6253ZM59.893 27.9844V16.6121L55.7013 19.0252L49.9104 22.3593V33.7317L59.8942 27.9844H59.893ZM47.9149 48.5566V37.1768L42.2187 40.4299L25.953 49.7133V61.2003L47.9149 48.5566ZM1.99677 9.83281V48.5566L23.9562 61.199V49.7145L12.4841 43.2219L12.4804 43.2194L12.4754 43.2169C12.4368 43.1945 12.4044 43.1621 12.3682 43.1347C12.3371 43.1097 12.3009 43.0898 12.2735 43.0624L12.271 43.0586C12.2386 43.0275 12.2162 42.9888 12.1887 42.9539C12.1638 42.9203 12.1339 42.8916 12.114 42.8567L12.1127 42.853C12.0903 42.8156 12.0766 42.7707 12.0604 42.7283C12.0442 42.6909 12.023 42.656 12.013 42.6161C12.0005 42.5688 11.998 42.5177 11.9931 42.4691C11.9881 42.4317 11.9781 42.3943 11.9781 42.3569V15.5801L6.18848 12.2446L1.99677 9.83281ZM12.9777 2.36177L2.99764 8.10652L12.9752 13.8513L22.9541 8.10527L12.9752 2.36177H12.9777ZM18.1678 38.2138L23.9574 34.8809V9.83281L19.7657 12.2459L13.9749 15.5801V40.6281L18.1678 38.2138ZM48.9133 9.14105L38.9344 14.8858L48.9133 20.6305L58.8909 14.8846L48.9133 9.14105ZM47.9149 22.3593L42.124 19.0252L37.9323 16.6121V27.9844L43.7219 31.3174L47.9149 33.7317V22.3593ZM24.9533 47.987L39.59 39.631L46.9065 35.4555L36.9352 29.7145L25.4544 36.3242L14.9907 42.3482L24.9533 47.987Z" />
                                    </svg>
                                </div>
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full animate-ping"></div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                    StoreBuilder
                                </h1>
                                <p className="text-xs text-gray-400">Your Store, Your Way</p>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="flex items-center space-x-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full font-semibold text-white hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <div className="flex items-center space-x-3">
                                    <Link
                                        href={route('login')}
                                        className="px-6 py-3 text-gray-300 hover:text-white border border-gray-600 hover:border-gray-400 rounded-full transition-all duration-300 hover:bg-white/5"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full font-semibold text-white hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300"
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="relative z-10 px-6">
                    <div className="max-w-7xl mx-auto">
                        {/* Hero Content */}
                        <div className="text-center py-20">
                            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-gray-300 mb-8 border border-white/20">
                                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                                Now with Crypto Payments & Multi-Channel Orders
                            </div>
                            
                            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
                                <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                                    Your Store
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                    Your Rules
                                </span>
                            </h1>
                            
                            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                                Create a professional online store with custom profiles, crypto payments, and multi-channel ordering. 
                                <span className="text-purple-300"> Accept Bitcoin & USDT (TRC20)</span> and let customers order via 
                                <span className="text-green-300"> WhatsApp, Telegram, or Email</span>.
                            </p>

                            {/* Payment Methods & Messaging Channels */}
                            <div className="flex flex-col lg:flex-row gap-8 justify-center items-center mb-12">
                                <div className="flex items-center space-x-4">
                                    <span className="text-gray-400 text-sm">Accept:</span>
                                    {paymentMethods.map((method, index) => (
                                        <div key={index} className="flex items-center space-x-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
                                            <span className={`text-lg ${method.color}`}>{method.icon}</span>
                                            <span className="text-sm text-gray-300">{method.name}</span>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="flex items-center space-x-4">
                                    <span className="text-gray-400 text-sm">Orders via:</span>
                                    {messagingChannels.map((channel, index) => (
                                        <div key={index} className="flex items-center space-x-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
                                            <span className={`text-lg ${channel.color}`}>{channel.icon}</span>
                                            <span className="text-sm text-gray-300">{channel.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                                <a href="/register" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 min-w-[200px]">
                                    Start Building
                                </a>
                                <a href="/demo" className="px-8 py-4 border border-gray-400 hover:border-white text-gray-300 hover:text-white rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white/5 min-w-[200px]">
                                    Watch Demo
                                </a>
                            </div>
                        </div>

                        {/* Features Carousel */}
                        <div className="relative py-20">
                            <div className="max-w-4xl mx-auto">
                                <div className="relative overflow-hidden">
                                    <div 
                                        className="flex transition-transform duration-1000 ease-in-out"
                                        style={{ transform: `translateX(-${currentFeature * 100}%)` }}
                                    >
                                        {features.map((feature, index) => (
                                            <div key={index} className="w-full flex-shrink-0 px-8">
                                                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105">
                                                    <div className="text-center">
                                                        <div className={`text-6xl mb-6 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                                                            {feature.icon}
                                                        </div>
                                                        <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                                                        <p className="text-gray-300 text-lg leading-relaxed">{feature.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Indicators */}
                                <div className="flex justify-center mt-8 space-x-2">
                                    {features.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentFeature(index)}
                                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                                index === currentFeature 
                                                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500 w-8' 
                                                    : 'bg-white/30 hover:bg-white/50'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div className="py-20">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                                {[
                                    { number: "2%", label: "Commission", subtext: "For free plan" },
                                    { number: "3", label: "Crypto Types", subtext: "Bitcoin & USDT TRC20" },
                                    { number: "3", label: "Order Channels", subtext: "WhatsApp, Telegram, Email" },
                                    { number: "∞", label: "Customization", subtext: "Unlimited possibilities" }
                                ].map((stat, index) => (
                                    <div key={index} className="text-center group">
                                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105">
                                            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                                                {stat.number}
                                            </div>
                                            <div className="text-xl font-semibold text-white mb-2">{stat.label}</div>
                                            <div className="text-gray-400 text-sm">{stat.subtext}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Feature Highlights */}
                        <div className="py-20">
                            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                Everything You Need to Succeed
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                                    <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                                        <div className="text-3xl mb-4">{item.icon}</div>
                                        <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                                        <p className="text-gray-300 leading-relaxed">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto px-6 py-12">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="text-gray-400 text-sm mb-4 md:mb-0">
                                Built with ❤️ using Laravel v{laravelVersion} & PHP v{phpVersion}
                            </div>
                            <div className="flex space-x-6 text-gray-400 text-sm">
                                <a href="#" className="hover:text-white transition-colors duration-300">Privacy</a>
                                <a href="#" className="hover:text-white transition-colors duration-300">Terms</a>
                                <a href="#" className="hover:text-white transition-colors duration-300">Support</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
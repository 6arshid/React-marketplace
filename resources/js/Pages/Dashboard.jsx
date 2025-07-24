import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Dashboard() {
    const { auth, stats, recentOrders, recentProducts, flash } = usePage().props;
    const user = auth.user;
    const [currentTime, setCurrentTime] = useState(new Date());
    const [activeCard, setActiveCard] = useState(null);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const getGreeting = () => {
        const hour = currentTime.getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    // Dynamic stats from backend
    const dashboardStats = [
        {
            title: 'Total Orders',
            value: stats?.orders_count || '0',
            change: stats?.orders_change || '+0%',
            changeType: stats?.orders_change?.includes('+') ? 'positive' : stats?.orders_change?.includes('-') ? 'negative' : 'neutral',
            icon: '📦',
            gradient: 'from-blue-500 to-cyan-500',
            href: route('orders.index')
        },
        {
            title: 'Revenue',
            value: stats?.revenue || '$0',
            change: stats?.revenue_change || '+0%',
            changeType: stats?.revenue_change?.includes('+') ? 'positive' : stats?.revenue_change?.includes('-') ? 'negative' : 'neutral',
            icon: '💰',
            gradient: 'from-green-500 to-emerald-500',
            href: route('transactions.index')
        },
        {
            title: 'Products',
            value: stats?.products_count || '0',
            change: stats?.products_change || '+0',
            changeType: stats?.products_change?.includes('+') ? 'positive' : stats?.products_change?.includes('-') ? 'negative' : 'neutral',
            icon: '🛍️',
            gradient: 'from-purple-500 to-pink-500',
            href: user.is_seller ? route('products.index') : '#'
        },
        {
            title: user.is_seller ? 'Sales' : 'Cart Items',
            value: user.is_seller ? (stats?.sales_count || '0') : (stats?.cart_count || '0'),
            change: user.is_seller ? (stats?.sales_change || '+0%') : (stats?.cart_change || '+0'),
            changeType: 'positive',
            icon: user.is_seller ? '💼' : '🛒',
            gradient: 'from-orange-500 to-red-500',
            href: user.is_seller ? route('sales.index') : route('cart.show')
        }
    ];

    // Dynamic quick actions based on user type
    const quickActions = user.is_seller ? [
        {
            title: 'Add Product',
            description: 'Create a new product listing',
            icon: '➕',
            color: 'bg-blue-500',
            href: route('products.create')
        },
        {
            title: 'Manage Orders',
            description: 'View and process orders',
            icon: '📋',
            color: 'bg-green-500',
            href: route('orders.index')
        },
        {
            title: 'View Sales',
            description: 'Check your sales performance',
            icon: '📊',
            color: 'bg-purple-500',
            href: route('sales.index')
        },
        {
            title: 'Manage Categories',
            description: 'Organize your product categories',
            icon: '📂',
            color: 'bg-indigo-500',
            href: route('categories.index')
        },
        {
            title: 'View Transactions',
            description: 'Check your payment history',
            icon: '💳',
            color: 'bg-cyan-500',
            href: route('transactions.index')
        },
        {
            title: 'Edit Profile',
            description: 'Update your store profile',
            icon: '⚙️',
            color: 'bg-orange-500',
            href: route('profile.edit')
        }
    ] : [
        {
            title: 'Browse Products',
            description: 'Discover new products',
            icon: '🛍️',
            color: 'bg-blue-500',
            href: '/'
        },
        {
            title: 'My Orders',
            description: 'Track your orders',
            icon: '📦',
            color: 'bg-green-500',
            href: route('orders.index')
        },
        {
            title: 'Shopping Cart',
            description: 'View items in your cart',
            icon: '🛒',
            color: 'bg-purple-500',
            href: route('cart.show')
        },
        {
            title: 'Downloads',
            description: 'Access your digital purchases',
            icon: '📥',
            color: 'bg-indigo-500',
            href: route('orders.downloads')
        },
        {
            title: 'Become Seller',
            description: 'Start selling your products',
            icon: '🚀',
            color: 'bg-cyan-500',
            href: route('profile.become-seller')
        },
        {
            title: 'Edit Profile',
            description: 'Update your profile information',
            icon: '⚙️',
            color: 'bg-orange-500',
            href: route('profile.edit')
        }
    ];

    // Dynamic recent activities based on user type and actual data
    const getRecentActivities = () => {
        let activities = [];
        
        if (user.is_seller) {
            // Add recent orders for sellers
            if (recentOrders?.length > 0) {
                recentOrders.slice(0, 3).forEach(order => {
                    activities.push({
                        type: 'order',
                        message: `New order #${order.id} from ${order.user?.name || 'Customer'}`,
                        time: new Date(order.created_at).toLocaleString(),
                        icon: '🛒',
                        href: route('orders.index')
                    });
                });
            }

            // Add recent products for sellers
            if (recentProducts?.length > 0) {
                recentProducts.slice(0, 2).forEach(product => {
                    activities.push({
                        type: 'product',
                        message: `Product "${product.name}" ${product.recently_updated ? 'updated' : 'created'}`,
                        time: new Date(product.updated_at).toLocaleString(),
                        icon: '✏️',
                        href: route('products.show', product.id)
                    });
                });
            }
        } else {
            // Add recent orders for buyers
            if (recentOrders?.length > 0) {
                recentOrders.slice(0, 4).forEach(order => {
                    activities.push({
                        type: 'order',
                        message: `Order #${order.id} - ${order.status}`,
                        time: new Date(order.updated_at).toLocaleString(),
                        icon: order.status === 'completed' ? '✅' : order.status === 'pending' ? '⏳' : '📦',
                        href: route('orders.index')
                    });
                });
            }
        }

        // Add default activities if none exist
        if (activities.length === 0) {
            activities = [
                { type: 'welcome', message: 'Welcome to your dashboard!', time: 'Just now', icon: '👋', href: '#' },
                { type: 'profile', message: 'Complete your profile setup', time: '1 hour ago', icon: '👤', href: route('profile.edit') }
            ];
        }

        return activities.slice(0, 4);
    };

    const recentActivities = getRecentActivities();

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                        Dashboard
                    </h2>
                    <div className="text-sm text-gray-500">
                        {currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString()}
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="py-8">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        
                        {/* Welcome Section */}
                        <div className="mb-8">
                            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-2xl p-8 text-white">
                                {/* Background Pattern */}
                                <div className="absolute inset-0 opacity-20">
                                    <div className="absolute inset-0" style={{
                                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                                        backgroundSize: '40px 40px'
                                    }}></div>
                                </div>
                                
                                {/* Floating Elements */}
                                <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
                                <div className="absolute bottom-4 left-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                                
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h1 className="text-3xl font-bold mb-2">
                                                {getGreeting()}, {user.name}! 👋
                                            </h1>
                                            <p className="text-blue-100 text-lg mb-4">
                                                {user.is_seller 
                                                    ? "Manage your store and track your sales" 
                                                    : "Welcome back to your marketplace dashboard"
                                                }
                                            </p>
                                            <div className="flex items-center space-x-4">
                                                <Link 
                                                    href={route('profile.edit')} 
                                                    className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-all duration-300 border border-white/20"
                                                >
                                                    <span className="mr-2">✏️</span>
                                                    Edit Profile
                                                </Link>
                                                <Link 
                                                    href={route('profile.show', user.username)} 
                                                    className="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium"
                                                >
                                                    <span className="mr-2">👁️</span>
                                                    {user.is_seller ? 'View Store' : 'View Profile'}: /{user.username}
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="hidden lg:block">
                                            <div className="text-right">
                                                <p className="text-blue-100 text-sm">
                                                    {user.is_seller ? 'Your Store URL' : 'Your Profile URL'}
                                                </p>
                                                <p className="text-2xl font-bold">/{user.username}</p>
                                                <p className="text-blue-200 text-xs mt-1">
                                                    {user.is_seller ? 'Seller Account' : 'Buyer Account'}
                                                    {user.is_admin && ' • Admin'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {dashboardStats.map((stat, index) => (
                                <Link
                                    key={index}
                                    href={stat.href}
                                    className="group"
                                >
                                    <div 
                                        className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100 cursor-pointer"
                                        onMouseEnter={() => setActiveCard(index)}
                                        onMouseLeave={() => setActiveCard(null)}
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-200`}>
                                                {stat.icon}
                                            </div>
                                            <div className={`text-sm font-medium px-2 py-1 rounded-full ${
                                                stat.changeType === 'positive' 
                                                    ? 'bg-green-100 text-green-600' 
                                                    : stat.changeType === 'negative'
                                                    ? 'bg-red-100 text-red-600'
                                                    : 'bg-gray-100 text-gray-600'
                                            }`}>
                                                {stat.change}
                                            </div>
                                        </div>
                                        <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
                                        <p className="text-3xl font-bold text-gray-800 mt-1 group-hover:text-blue-600 transition-colors">
                                            {stat.value}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            
                            {/* Quick Actions */}
                            <div className="lg:col-span-2">
                                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                        <span className="mr-2">⚡</span>
                                        Quick Actions
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {quickActions.map((action, index) => (
                                            <Link
                                                key={index}
                                                href={action.href}
                                                className="group p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-md"
                                            >
                                                <div className="flex items-center space-x-4">
                                                    <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300`}>
                                                        {action.icon}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                                                            {action.title}
                                                        </h4>
                                                        <p className="text-sm text-gray-500">{action.description}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div>
                                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                        <span className="mr-2">📱</span>
                                        Recent Activity
                                    </h3>
                                    <div className="space-y-4">
                                        {recentActivities.map((activity, index) => (
                                            <Link
                                                key={index}
                                                href={activity.href}
                                                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="text-lg">{activity.icon}</div>
                                                <div className="flex-1">
                                                    <p className="text-sm text-gray-800 font-medium">
                                                        {activity.message}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {activity.time}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                    <Link
                                        href={user.is_seller ? route('sales.index') : route('orders.index')}
                                        className="w-full mt-4 py-2 text-blue-600 hover:text-blue-700 font-medium text-sm hover:bg-blue-50 rounded-lg transition-colors block text-center"
                                    >
                                        View All {user.is_seller ? 'Sales' : 'Orders'}
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Additional Info Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                            
                            {/* Account Status */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                    <span className="mr-2">👤</span>
                                    Account Status
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Account Type</span>
                                        <span className={`font-semibold px-3 py-1 rounded-full text-sm ${
                                            user.is_seller 
                                                ? 'bg-blue-100 text-blue-600' 
                                                : 'bg-green-100 text-green-600'
                                        }`}>
                                            {user.is_seller ? 'Seller' : 'Buyer'}
                                        </span>
                                    </div>
                                    
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Profile Complete</span>
                                        <span className="font-semibold text-green-600">85%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
                                    </div>

                                    {user.is_admin && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Admin Access</span>
                                            <Link 
                                                href={route('admin.index')}
                                                className="font-semibold text-purple-600 hover:text-purple-700"
                                            >
                                                Admin Panel
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Payment Methods / Store Tools */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                    <span className="mr-2">{user.is_seller ? '🛠️' : '💳'}</span>
                                    {user.is_seller ? 'Store Tools' : 'Quick Links'}
                                </h3>
                                <div className="space-y-3">
                                    {user.is_seller ? (
                                        <>
                                            <Link
                                                href={route('categories.index')}
                                                className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-xl">📂</span>
                                                    <span className="font-medium">Categories</span>
                                                </div>
                                                <span className="text-blue-600 text-sm font-medium">Manage</span>
                                            </Link>
                                            <Link
                                                href={route('seller.pages.index')}
                                                className="flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-xl">📄</span>
                                                    <span className="font-medium">Pages</span>
                                                </div>
                                                <span className="text-green-600 text-sm font-medium">Edit</span>
                                            </Link>
                                            <Link
                                                href={route('transactions.index')}
                                                className="flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-xl">💰</span>
                                                    <span className="font-medium">Transactions</span>
                                                </div>
                                                <span className="text-purple-600 text-sm font-medium">View</span>
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                href={route('orders.downloads')}
                                                className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-xl">📥</span>
                                                    <span className="font-medium">Downloads</span>
                                                </div>
                                                <span className="text-blue-600 text-sm font-medium">Access</span>
                                            </Link>
                                            <Link
                                                href={route('orders.track-form')}
                                                className="flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-xl">📍</span>
                                                    <span className="font-medium">Track Order</span>
                                                </div>
                                                <span className="text-green-600 text-sm font-medium">Track</span>
                                            </Link>
                                            <Link
                                                href={route('profile.become-seller')}
                                                className="flex items-center justify-between p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-xl">🚀</span>
                                                    <span className="font-medium">Become Seller</span>
                                                </div>
                                                <span className="text-orange-600 text-sm font-medium">Start</span>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
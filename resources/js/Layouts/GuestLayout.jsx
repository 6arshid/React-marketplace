import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    const { component, url, props } = usePage();
    const isAuthPage = component && component.startsWith('Auth/');

    const isProfilePage = /^\/[a-zA-Z0-9_-]+$/.test(url);
    const isProductPage = url.startsWith('/products/');
    const isCartPage = url === '/cart';
    const isTrackPage = url.startsWith('/track/');
    const isCategoryPage = /\/store\/categories\//.test(url);

    const showUserLogo = isProfilePage || isCategoryPage || isTrackPage || isProductPage;;

    const user = props?.auth?.user;
    const userInitial = user?.name?.charAt(0)?.toUpperCase();
    const profileUrl = user ? `/${user.username}` : '/profile';
    const homeUrl = user?.pro_panel ? `/${user.username}` : '/';

    if (isAuthPage) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    {/* Logo Section */}
                    <div className="text-center">
                        <Link href={homeUrl} className="inline-block">
                            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                <ApplicationLogo className="h-12 w-12 text-white" />
                            </div>
                        </Link>
                    </div>

                    {/* Auth Form Container */}
                    <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl px-8 py-10 border border-white/20">
                        {children}
                    </div>

                    {/* Footer */}
                    <div className="text-center">
                        <p className="text-sm text-gray-500">
                            Secure and encrypted
                        </p>
                    </div>
                </div>

                                    {/* Background Decorations */}
                <div className="fixed inset-0 -z-10 overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-x-hidden">
            {/* Navigation Header */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 max-w-7xl mx-auto">
                        {/* Left Side - Logo/Navigation */}
                        <div className="flex items-center">
                            {isProfilePage ? (
                                <div className="flex items-center space-x-2">
                                    <Link
                                        href={homeUrl}
                                        className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-200 hover:scale-105"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75M4.5 10.5v10.125c0 .621.504 1.125 1.125 1.125h3.75c.621 0 1.125-.504 1.125-1.125V15.75c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v4.875c0 .621.504 1.125 1.125 1.125h3.75c.621 0 1.125-.504 1.125-1.125V10.5" />
                                        </svg>
                                    </Link>
                                    {props.isOwner && (
                                        <Link
                                            href={route('dashboard')}
                                            className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-200 hover:scale-105"
                                        >
                                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-speedometer" viewBox="0 0 16 16">
  <path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2M3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.39.39 0 0 0-.029-.518z"/>
  <path fill-rule="evenodd" d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.95 11.95 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0"/>
</svg>
                                        </Link>
                                    )}
                                </div>
                            ) : showUserLogo && user ? (
                                <Link 
                                    href={profileUrl} 
                                    className="flex items-center space-x-3 group"
                                >
                                    <div className="relative">
                                        <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-sm font-semibold overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-200 group-hover:scale-105">
                                            {user.logo ? (
                                                <img
                                                    src={`/storage/${user.logo}`}
                                                    alt="logo"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span>{userInitial}</span>
                                            )}
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                                    </div>
                                    <div className="hidden sm:block">
                                        <p className="text-sm font-medium text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                                            {user.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            View Profile
                                        </p>
                                    </div>
                                </Link>
                            ) : (
                                <Link href={homeUrl} className="flex items-center space-x-2 group">
                                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-200 group-hover:scale-105">
                                        <ApplicationLogo className="h-6 w-6 text-white" />
                                    </div>
                                    <span className="hidden sm:block text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                        Store
                                    </span>
                                </Link>
                            )}
                        </div>

                        {/* Right Side - Navigation Links */}
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            <Link 
                                href="/track/" 
                                className="group flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-xl text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 font-medium text-sm sm:text-base"
                            >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="hidden sm:inline">Track Order</span>
                                <span className="sm:hidden text-xs">Track</span>
                            </Link>
                            
                            <Link 
                                href="/cart" 
                                className="group relative flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white transition-all duration-200 font-medium shadow-md hover:shadow-lg hover:scale-105 text-sm sm:text-base"
                            >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5m0 0h9.1M16 18a2 2 0 11-4 0 2 2 0 014 0zM9 18a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="hidden sm:inline">Cart</span>
                                <span className="sm:hidden text-xs">Cart</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-16">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto py-8 sm:py-12">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                            {/* Brand Section */}
                            <div className="col-span-1 sm:col-span-2 lg:col-span-2">
                                <div className="flex items-center space-x-2 mb-4">
                                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                                        <ApplicationLogo className="h-5 w-5 text-white" />
                                    </div>
                                    <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                        Store
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm sm:text-base max-w-md">
                                    Your trusted marketplace for quality products. Shop with confidence and enjoy seamless shopping experience.
                                </p>
                            </div>

                            {/* Quick Links */}
                            {user?.pro_panel && (
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">Quick Links</h3>
                                    <div className="space-y-2">
                                        <Link href={homeUrl} className="block text-gray-600 hover:text-indigo-600 transition-colors duration-200 text-sm">
                                            Home
                                        </Link>
                                        <Link href="/track/" className="block text-gray-600 hover:text-indigo-600 transition-colors duration-200 text-sm">
                                            Track Order
                                        </Link>
                                        <Link href="/cart" className="block text-gray-600 hover:text-indigo-600 transition-colors duration-200 text-sm">
                                            Shopping Cart
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {/* Support */}
                            {props.pages?.length > 0 && (
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">Support</h3>
                                    <div className="space-y-2">
                                        {props.pages.map((p) => (
                                            <Link
                                                key={p.slug}
                                                href={route('pages.show', p.slug)}
                                                className="block text-gray-600 hover:text-indigo-600 transition-colors duration-200 text-sm"
                                            >
                                                {p.title}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="border-t border-gray-200 mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                            <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
                                © 2025 Store. All rights reserved.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                                <span className="text-xs sm:text-sm text-gray-500">Secure payments</span>
                                <div className="flex space-x-2">
                                    <div className="w-6 h-4 sm:w-8 sm:h-5 bg-gray-200 rounded"></div>
                                    <div className="w-6 h-4 sm:w-8 sm:h-5 bg-gray-200 rounded"></div>
                                    <div className="w-6 h-4 sm:w-8 sm:h-5 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
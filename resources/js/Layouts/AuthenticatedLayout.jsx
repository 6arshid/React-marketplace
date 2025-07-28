import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import LanguageDropdown from "@/Components/LanguageDropdown";
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { createPortal } from 'react-dom';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const { t, i18n } = useTranslation();
    const homeUrl = user?.pro_panel ? `/${user.username}` : '/';
    const pages = usePage().props.pages || [];
    const flash = usePage().props.flash;
    const cart = usePage().props.cart;
    const notifications = usePage().props.notifications || [];
    const notificationsCount = usePage().props.notifications_count || 0;

    // Check if current language is RTL
    const isRTL = i18n.language === 'ar' || i18n.language === 'fa' || i18n.language === 'he';

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [notificationRect, setNotificationRect] = useState(null);
    const [userDropdownRect, setUserDropdownRect] = useState(null);
    
    const notificationRef = useRef(null);
    const userDropdownRef = useRef(null);
    const notificationDropdownRef = useRef(null);
    const userDropdownMenuRef = useRef(null);
    const notificationButtonRef = useRef(null);
    const userButtonRef = useRef(null);
    const notificationScrollRef = useRef(null);

    const [notificationList, setNotificationList] = useState([]);
    const [notificationsPage, setNotificationsPage] = useState(1);
    const [hasMoreNotifications, setHasMoreNotifications] = useState(true);
    const [loadingNotifications, setLoadingNotifications] = useState(false);

    // Update position when dropdown opens
    useEffect(() => {
        if (notificationOpen && notificationButtonRef.current) {
            const rect = notificationButtonRef.current.getBoundingClientRect();
            setNotificationRect(rect);
        }
        if (userDropdownOpen && userButtonRef.current) {
            const rect = userButtonRef.current.getBoundingClientRect();
            setUserDropdownRect(rect);
        }
    }, [notificationOpen, userDropdownOpen]);

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                notificationOpen &&
                notificationRef.current &&
                !notificationRef.current.contains(event.target) &&
                notificationDropdownRef.current &&
                !notificationDropdownRef.current.contains(event.target)
            ) {
                setNotificationOpen(false);
            }
            if (
                userDropdownOpen &&
                userDropdownRef.current &&
                !userDropdownRef.current.contains(event.target) &&
                userDropdownMenuRef.current &&
                !userDropdownMenuRef.current.contains(event.target)
            ) {
                setUserDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [notificationOpen, userDropdownOpen]);

    // Close dropdowns when sidebar opens on mobile
    useEffect(() => {
        if (sidebarOpen) {
            setNotificationOpen(false);
            setUserDropdownOpen(false);
        }
    }, [sidebarOpen]);

    const fetchNotifications = async (page = 1) => {
        setLoadingNotifications(true);
        try {
            const res = await axios.get(route('notifications.index', { page }));
            if (page === 1) {
                setNotificationList(res.data.data);
            } else {
                setNotificationList(prev => [...prev, ...res.data.data]);
            }
            setHasMoreNotifications(res.data.next_page_url !== null);
            setNotificationsPage(page);
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingNotifications(false);
        }
    };

    useEffect(() => {
        if (notificationOpen) {
            fetchNotifications(1);
        }
    }, [notificationOpen]);

    const handleNotificationScroll = () => {
        const el = notificationScrollRef.current;
        if (!el || loadingNotifications || !hasMoreNotifications) return;
        if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) {
            fetchNotifications(notificationsPage + 1);
        }
    };

    // Calculate dropdown positions based on RTL
    const getNotificationDropdownStyle = () => {
        if (!notificationRect) return {};
        
        const style = {
            top: notificationRect.bottom + 8,
        };

        if (isRTL) {
            // For RTL, align to the left edge of the button
            style.left = notificationRect.left;
        } else {
            // For LTR, align to the right edge of the button
            style.left = notificationRect.right - 320;
        }

        return style;
    };

    const getUserDropdownStyle = () => {
        if (!userDropdownRect) return {};
        
        const style = {
            top: userDropdownRect.bottom + 8,
        };

        if (isRTL) {
            // For RTL, align to the left edge of the button
            style.left = userDropdownRect.left;
        } else {
            // For LTR, align to the right edge of the button
            style.left = userDropdownRect.right - 192;
        }

        return style;
    };

    const navigationItems = [
        {
            name: t('Dashboard'),
            href: 'dashboard',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                </svg>
            )
        }
    ];

    if (user.is_seller) {
        navigationItems.push(
            {
                name: t('Products'),
                href: 'products.index',
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                )
            },
            {
                name: t('Categories'),
                href: 'categories.index',
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                )
            },
            {
                name: t('Pages'),
                href: 'seller.pages.index',
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                )
            },
            {
                name: t('Discount Codes'),
                href: 'coupons.index',
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 15l-6 6m0 0h6m-6 0v-6M15 9l6-6m-6 0h6m-6 0v6M21 15a6 6 0 11-12 0 6 6 0 0112 0z" />
                    </svg>
                )
            },
            {
                name: t('Transactions'),
                href: 'transactions.index',
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.110 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                )
            },
            {
                name: t('Sales'),
                href: 'sales.index',
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                )
            },
            {
                name: t('Change to Buyer'),
                href: 'profile.become-buyer',
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                )
            }
        );
    } else {
        navigationItems.push({
            name: t('Change to Seller'),
            href: 'profile.become-seller',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
            )
        });
    }

    navigationItems.push(
        {
            name: t('Cart'),
            href: 'cart.show',
            badge: cart.count,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5M7 13l-1.1 5m0 0h9.1M16 18a2 2 0 11-4 0 2 2 0 014 0zM9 18a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        },
        {
            name: t('Orders'),
            href: 'orders.index',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        },
        {
            name: t('Downloads'),
            href: 'orders.downloads',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        }
    );

    if (user.is_admin) {
        navigationItems.push({
            name: t('Admin'),
            href: 'admin.index',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            )
        });
    }

    return (
        <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Sidebar Overlay for Mobile */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 sm:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 ${isRTL ? 'right-0' : 'left-0'} z-50 w-72 transform backdrop-blur-lg bg-white/90 border-${isRTL ? 'l' : 'r'} border-white/20 shadow-2xl transition-transform duration-300 ease-in-out ${
                    sidebarOpen 
                        ? 'translate-x-0' 
                        : isRTL 
                            ? 'translate-x-full sm:translate-x-0' 
                            : '-translate-x-full sm:translate-x-0'
                }`}
            >
                {/* Logo Section */}
                <div className="flex h-20 items-center justify-between border-b border-white/20 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
                    <Link href={homeUrl} className="group">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                <ApplicationLogo className="block h-6 w-auto fill-current text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">{import.meta.env.VITE_APP_NAME}</span>
                        </div>
                    </Link>
                    <button
                        className="sm:hidden p-2 rounded-xl bg-white/20 text-white hover:bg-white/30 transition-colors"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <svg className="h-5 w-5" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Navigation */}
                <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {navigationItems.map((item) => {
                        const isActive = route().current(item.href);
                        return (
                            <Link
                                key={item.name}
                                href={route(item.href)}
                                className={`group flex items-center px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-200 hover:scale-[1.02] ${
                                    isActive
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                                        : 'text-gray-700 hover:bg-white/70 hover:shadow-md'
                                }`}
                            >
                                <div className={`${isRTL ? 'ml-3' : 'mr-3'} transition-colors ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-blue-600'}`}>
                                    {item.icon}
                                </div>
                                <span className="flex-1">{item.name}</span>
                                {item.badge && (
                                    <div className={`${isRTL ? 'mr-2' : 'ml-2'} px-2 py-1 text-xs font-bold rounded-full ${
                                        isActive 
                                            ? 'bg-white/20 text-white' 
                                            : 'bg-blue-100 text-blue-600'
                                    }`}>
                                        {item.badge}
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </div>

                {pages.length > 0 && (
                    <div className="px-4 pb-6">
                        <h3 className="font-semibold text-gray-900 mb-2 text-sm">{t('Pages')}</h3>
                        <div className="space-y-1">
                            {pages.map((p) => (
                                <Link
                                    key={p.slug}
                                    href={route('pages.show', p.slug)}
                                    className="block text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                                >
                                    {p.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

              
            </aside>

            {/* Portal Dropdowns - Rendered at body level */}
            {notificationOpen && notificationRect && createPortal(
                <>
                    <div 
                        className="fixed inset-0 z-[999999]" 
                        onClick={() => setNotificationOpen(false)}
                        style={{ backgroundColor: 'transparent' }}
                    ></div>
                    <div
                        ref={notificationDropdownRef}
                        className="fixed z-[9999999] w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 max-h-96 overflow-hidden"
                        style={getNotificationDropdownStyle()}
                    >
                        <div className="px-4 py-3 border-b border-gray-100">
                            <h3 className="font-semibold text-gray-800">{t('Notifications')}</h3>
                        </div>
                        <div
                            className="py-2 max-h-64 overflow-y-auto"
                            ref={notificationScrollRef}
                            onScroll={handleNotificationScroll}
                        >
                            {notificationList.length === 0 && !loadingNotifications && (
                                <div className="px-4 py-3 text-sm text-gray-500">{t('No notifications')}</div>
                            )}
                            {notificationList.map((n) => (
                                n.data.tracking_code ? (
                                    <Link
                                        key={n.id}
                                        href={route('orders.track', n.data.tracking_code)}
                                        className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-start space-x-3">
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.403-3.403A1 1 0 0116 13V9a4 4 0 00-8 0v4a1 1 0 01-.293.707L5 17h5m5 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-gray-800">{n.data.message}</p>
                                                <p className="text-xs text-gray-500">{n.created_at}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ) : (
                                    <div key={n.id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-start space-x-3">
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.403-3.403A1 1 0 0116 13V9a4 4 0 00-8 0v4a1 1 0 01-.293.707L5 17h5m5 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-gray-800">{n.data.message}</p>
                                                <p className="text-xs text-gray-500">{n.created_at}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            ))}
                            {loadingNotifications && (
                                <div className="px-4 py-3 text-sm text-gray-500">{t('Loading...')}</div>
                            )}
                            {!hasMoreNotifications && notificationList.length > 0 && (
                                <div className="px-4 py-3 text-sm text-gray-500 text-center">{t('No more notifications')}</div>
                            )}
                        </div>
                        <div className="border-t border-gray-100 px-4 py-3 flex justify-between items-center">
                            <Link as="button" method="post" href={route('notifications.read-all')} className="text-sm text-gray-500 hover:text-gray-700">
                                {t('Mark all as read')}
                            </Link>
                            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium" onClick={() => setNotificationOpen(false)}>
                                {t('Close')}
                            </button>
                        </div>
                    </div>
                </>,
                document.body
            )}

            {userDropdownOpen && userDropdownRect && createPortal(
                <>
                    <div 
                        className="fixed inset-0 z-[999999]" 
                        onClick={() => setUserDropdownOpen(false)}
                        style={{ backgroundColor: 'transparent' }}
                    ></div>
                    <div
                        ref={userDropdownMenuRef}
                        className="fixed z-[9999999] w-48 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
                        style={getUserDropdownStyle()}
                    >
                        <Link
                            href={route('profile.edit')}
                            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setUserDropdownOpen(false)}
                        >
                            <svg className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {t('Edit Profile')}
                        </Link>
                        <Link
                            href={route('profile.show', user.username)}
                            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setUserDropdownOpen(false)}
                        >
                            <svg className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {t('Show Profile')}
                        </Link>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="flex items-center w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-gray-50 transition-colors"
                            onClick={() => setUserDropdownOpen(false)}
                        >
                            <svg className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            {t('Log Out')}
                        </Link>
                    </div>
                </>,
                document.body
            )}

            {/* Main Content */}
            <div className={`flex min-h-screen flex-1 flex-col ${isRTL ? 'sm:mr-72' : 'sm:ml-72'}`}>
                {/* Top Navigation Bar */}
                <div className="flex items-center justify-between backdrop-blur-lg bg-white/80 border-b border-white/20 shadow-lg px-6 py-4">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="inline-flex items-center justify-center rounded-2xl p-3 text-gray-600 transition duration-200 ease-in-out hover:bg-white/70 hover:text-blue-600 focus:bg-white/70 focus:text-blue-600 focus:outline-none sm:hidden shadow-md"
                    >
                        <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <div className={`${isRTL ? 'mr-auto' : 'ml-auto'} flex items-center space-x-4`}>
                        {/* Notification Dropdown */}
                        <div className="relative" ref={notificationRef}>
                            <button 
                                ref={notificationButtonRef}
                                onClick={() => {
                                    setNotificationOpen(!notificationOpen);
                                    setUserDropdownOpen(false);
                                }}
                                className="relative p-3 rounded-2xl border-2 border-white/20 bg-white/70 text-gray-600 hover:text-blue-600 hover:bg-white hover:border-blue-200 transition-all duration-200 shadow-md focus:outline-none"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.403-3.403A1 1 0 0116 13V9a4 4 0 00-8 0v4a1 1 0 01-.293.707L5 17h5m5 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                {notificationsCount > 0 && (
                                    <div className={`absolute -top-1 ${isRTL ? '-left-1' : '-right-1'} w-4 h-4 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center`}>
                                        <span className="text-white text-xs font-bold">{notificationsCount}</span>
                                    </div>
                                )}
                            </button>
                        </div>

                        {/* User Dropdown */}
                        <div className="relative" ref={userDropdownRef}>
                            <button
                                ref={userButtonRef}
                                onClick={() => {
                                    setUserDropdownOpen(!userDropdownOpen);
                                    setNotificationOpen(false);
                                }}
                                className="flex items-center rounded-2xl border-2 border-white/20 bg-white/70 px-4 py-2 text-sm font-medium leading-4 text-gray-700 transition duration-200 ease-in-out hover:bg-white hover:text-blue-600 hover:border-blue-200 focus:outline-none shadow-md"
                            >
                                <div className={`w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs ${isRTL ? 'ml-3' : 'mr-3'}`}>
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="hidden sm:block">{user.name}</span>
                                <svg
                                    className={`${isRTL ? 'mr-2' : 'ml-2'} h-4 w-4`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Flash Messages */}
                {flash.success && (
                    <div className="mx-6 mt-4 animate-slide-down">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-2xl shadow-lg flex items-center">
                            <svg className={`w-6 h-6 ${isRTL ? 'ml-3' : 'mr-3'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="font-medium">{flash.success}</span>
                        </div>
                    </div>
                )}

                {flash.error && (
                    <div className="mx-6 mt-4 animate-slide-down">
                        <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-4 rounded-2xl shadow-lg flex items-center">
                            <svg className={`w-6 h-6 ${isRTL ? 'ml-3' : 'mr-3'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-medium">{flash.error}</span>
                        </div>
                    </div>
                )}

                {/* Page Header */}
                {/* {header && (
                    <header className="backdrop-blur-lg bg-white/80 shadow-lg border-b border-white/20 relative z-10">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )} */}

                {/* Main Content */}
                <main className="flex-1">{children}</main>
            </div>

            <style>{`
                @keyframes slide-down {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .animate-slide-down {
                    animation: slide-down 0.3s ease-out;
                }

                /* RTL specific styles */
                [dir="rtl"] .space-x-3 > * + * {
                    margin-left: 0;
                    margin-right: 0.75rem;
                }

                [dir="rtl"] .space-x-4 > * + * {
                    margin-left: 0;
                    margin-right: 1rem;
                }

                /* Fix for notification items in RTL */
                [dir="rtl"] .flex.items-start.space-x-3 {
                    flex-direction: row-reverse;
                }

                [dir="rtl"] .flex.items-start.space-x-3 > * + * {
                    margin-left: 0.75rem;
                    margin-right: 0;
                }
            `}</style>
        </div>
    );
}
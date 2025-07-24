import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
// Custom SVG Icon Components
const CreditCard = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
        <line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
);

const Receipt = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14,2 14,8 20,8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10,9 9,9 8,9"/>
    </svg>
);

const Crown = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="m2 20 3-11 5.5 5.5L15 9l5 11z"/>
        <path d="m4.5 15.5 5-6.5 5 6.5"/>
    </svg>
);

const BarChart3 = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M3 3v18h18"/>
        <path d="m19 9-5 5-4-4-3 3"/>
    </svg>
);

const Palette = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="13.5" cy="6.5" r=".5"/>
        <circle cx="17.5" cy="10.5" r=".5"/>
        <circle cx="8.5" cy="7.5" r=".5"/>
        <circle cx="6.5" cy="12.5" r=".5"/>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
    </svg>
);

const Settings = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3"/>
        <path d="m12 1 0 6m0 6 0 6m11-7-6 0m-6 0-6 0"/>
    </svg>
);

const Code = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
    </svg>
);

const FileText = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14,2 14,8 20,8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10,9 9,9 8,9"/>
    </svg>
);

const Shield = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
);

const Map = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
        <line x1="8" y1="2" x2="8" y2="18"/>
        <line x1="16" y1="6" x2="16" y2="22"/>
    </svg>
);

const Users = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="m22 21-3.5-3.5a3 3 0 1 0-4.24 4.24L18 18.5z"/>
    </svg>
);

export default function Index() {
    const { t } = useTranslation();

    const menuItems = [
        {
            href: route('admin.stripe.edit'),
            label: t('Configure Stripe'),
            icon: CreditCard,
            description: t('Payment gateway settings'),
            color: 'from-purple-500 to-purple-600'
        },
        {
            href: route('admin.transactions.index'),
            label: t('Transactions'),
            icon: Receipt,
            description: t('View payment history'),
            color: 'from-green-500 to-green-600'
        },
        {
            href: route('admin.pro-panel.index'),
            label: t('Pro Panel'),
            icon: Crown,
            description: t('Premium features'),
            color: 'from-yellow-500 to-yellow-600'
        },
        {
            href: route('admin.reports.index'),
            label: t('Reports'),
            icon: BarChart3,
            description: t('Analytics & insights'),
            color: 'from-blue-500 to-blue-600'
        },
        {
            href: route('admin.review-reports.index'),
            label: t('Review Reports'),
            icon: BarChart3,
            description: t('Review Reports'),
            color: 'from-blue-400 to-blue-500'
        },
        {
            href: route('admin.appearance.edit'),
            label: t('Appearance'),
            icon: Palette,
            description: t('Customize UI theme'),
            color: 'from-pink-500 to-pink-600'
        },
        {
            href: route('admin.general-config.edit'),
            label: t('General Config'),
            icon: Settings,
            description: t('System configuration'),
            color: 'from-gray-500 to-gray-600'
        },
        {
            href: route('admin.custom-code.edit'),
            label: t('Custom Code'),
            icon: Code,
            description: t('Custom scripts & styles'),
            color: 'from-indigo-500 to-indigo-600'
        },
        {
            href: route('admin.pages.index'),
            label: t('Pages'),
            icon: FileText,
            description: t('Manage static pages'),
            color: 'from-teal-500 to-teal-600'
        },
        {
            href: route('admin.reserved-usernames.index'),
            label: t('Reserved Usernames'),
            icon: Shield,
            description: t('Protected usernames'),
            color: 'from-red-500 to-red-600'
        },
        {
            href: route('admin.domains.index'),
            label: t('Domains'),
            icon: Map,
            description: t('Manage user domains'),
            color: 'from-green-500 to-green-600'
        },
        {
            href: route('admin.sitemap.index'),
            label: t('Sitemap'),
            icon: Map,
            description: t('SEO & navigation'),
            color: 'from-orange-500 to-orange-600'
        },
        {
            href: route('admin.users.index'),
            label: t('Users'),
            icon: Users,
            description: t('User management'),
            color: 'from-cyan-500 to-cyan-600'
        }
    ];

    return (
        <AuthenticatedLayout 
            header={
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Settings className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                        {t('Admin Dashboard')}
                    </h2>
                </div>
            }
        >
            <Head title={t('Admin Dashboard')} />
            
            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Welcome Section */}
                    <div className="mb-8">
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {t('Welcome to Admin Panel')}
                            </h3>
                            <p className="text-gray-600">
                                {t('Manage your application settings and monitor system performance from this central dashboard.')}
                            </p>
                        </div>
                    </div>

                    {/* Admin Menu Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {menuItems.map((item, index) => {
                            const IconComponent = item.icon;
                            return (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1"
                                >
                                    {/* Background Gradient */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                                    
                                    {/* Icon */}
                                    <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        <IconComponent className="w-6 h-6 text-white" />
                                    </div>
                                    
                                    {/* Content */}
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
                                            {item.label}
                                        </h4>
                                        <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
                                            {item.description}
                                        </p>
                                    </div>
                                    
                                    {/* Hover Arrow */}
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                                            <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Quick Stats */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">{t('System Status')}</p>
                                    <p className="text-2xl font-bold text-green-600">{t('Online')}</p>
                                </div>
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">{t('Last Updated')}</p>
                                    <p className="text-2xl font-bold text-blue-600">{t('Today')}</p>
                                </div>
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <BarChart3 className="w-5 h-5 text-blue-600" />
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">{t('Quick Access')}</p>
                                    <p className="text-2xl font-bold text-purple-600">{menuItems.length}</p>
                                </div>
                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                    <Settings className="w-5 h-5 text-purple-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
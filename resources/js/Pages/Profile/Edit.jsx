import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import SettlementForm from './Partials/SettlementForm';
import ContactInfoForm from './Partials/ContactInfoForm';
import PublicInfoForm from './Partials/PublicInfoForm';


export default function Edit({ mustVerifyEmail, status }) {
    const { t } = useTranslation();
    const sections = [
        {
            id: 'profile',
            title: t('Profile Information'),
            description: t('Update your account profile information and email address.'),
            icon: (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
            component: UpdateProfileInformationForm,
            props: { mustVerifyEmail, status, className: "max-w-none" }
        },
        {
            id: 'public',
            title: t('Public Information'),
            description: t('Manage your public profile visibility and information.'),
            icon: (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            component: PublicInfoForm,
            props: { className: "max-w-none" }
        },
        {
            id: 'contact',
            title: t('Contact Information'),
            description: t('Keep your contact details up to date.'),
            icon: (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            component: ContactInfoForm,
            props: { className: "max-w-none" }
        },
        {
            id: 'settlement',
            title: t('Settlement Details'),
            description: t('Manage your payment and settlement preferences.'),
            icon: (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
            ),
            component: SettlementForm,
            props: { className: "max-w-none" }
        },
        {
            id: 'password',
            title: t('Security Settings'),
            description: t('Ensure your account is using a long, random password.'),
            icon: (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            component: UpdatePasswordForm,
            props: { className: "max-w-none" }
        },
        {
            id: 'delete',
            title: t('Delete Account'),
            description: t('Permanently delete your account and all associated data.'),
            icon: (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            ),
            component: DeleteUserForm,
            props: { className: "max-w-none" },
            danger: true
        }
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl shadow-2xl">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative px-8 py-12">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2">
                                    {t('Profile Settings')}
                                </h1>
                                <p className="text-blue-100 text-lg">
                                    {t('Manage your account settings and preferences')}
                                </p>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                        <div className="absolute bottom-0 left-1/2 w-24 h-24 bg-white/10 rounded-full translate-y-12"></div>
                    </div>
                </div>
            }
        >
            <Head title={t('Profile Settings')} />

            <div className="min-h-screen bg-gray-50">
                <div className="py-12">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-8 lg:grid-cols-12">
                            {/* Sidebar Navigation */}
                            <div className="lg:col-span-3">
                                <div className="sticky top-8">
                                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                                        <div className="p-6 border-b border-gray-100">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {t('Settings')}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {t('Customize your account')}
                                            </p>
                                        </div>
                                        <nav className="p-2">
                                            {sections.map((section) => {
                                                return (
                                                    <a
                                                        key={section.id}
                                                        href={`#${section.id}`}
                                                        className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 hover:bg-gray-50 ${
                                                            section.danger 
                                                                ? 'text-red-600 hover:bg-red-50' 
                                                                : 'text-gray-700 hover:text-blue-600'
                                                        }`}
                                                    >
                                                        <div className={`mr-3 ${
                                                            section.danger 
                                                                ? 'text-red-500' 
                                                                : 'text-gray-400 group-hover:text-blue-500'
                                                        }`}>
                                                            {section.icon}
                                                        </div>
                                                        {section.title}
                                                    </a>
                                                );
                                            })}
                                        </nav>
                                    </div>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="lg:col-span-9 space-y-8">
                                {sections.map((section) => {
                                    const Component = section.component;
                                    
                                    return (
                                        <div
                                            key={section.id}
                                            id={section.id}
                                            className={`group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                                                section.danger 
                                                    ? 'bg-gradient-to-r from-red-50 to-pink-50 border border-red-100' 
                                                    : 'bg-white border border-gray-100 hover:border-blue-200'
                                            }`}
                                        >
                                            {/* Decorative Elements */}
                                            <div className={`absolute top-0 right-0 w-32 h-32 opacity-5 ${
                                                section.danger ? 'bg-red-500' : 'bg-blue-500'
                                            } rounded-full -translate-y-16 translate-x-16`}></div>
                                            
                                            {/* Header */}
                                            <div className={`px-8 py-6 border-b ${
                                                section.danger ? 'border-red-100' : 'border-gray-100'
                                            }`}>
                                                <div className="flex items-start space-x-4">
                                                    <div className={`p-3 rounded-xl shadow-sm ${
                                                        section.danger 
                                                            ? 'bg-red-100 text-red-600' 
                                                            : 'bg-blue-100 text-blue-600'
                                                    }`}>
                                                        {section.icon}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className={`text-xl font-semibold ${
                                                            section.danger ? 'text-red-900' : 'text-gray-900'
                                                        }`}>
                                                            {section.title}
                                                        </h3>
                                                        <p className={`mt-2 text-sm ${
                                                            section.danger ? 'text-red-600' : 'text-gray-600'
                                                        }`}>
                                                            {section.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-8">
                                                <Component {...section.props} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
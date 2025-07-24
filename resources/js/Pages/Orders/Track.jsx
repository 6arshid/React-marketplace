import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

// Custom SVG Icons
const TrackingIcon = ({ className = "w-6 h-6 md:w-8 md:h-8" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,14L6.5,9.5L7.91,8.09L11,11.18L16.59,5.59L18,7V14H11Z"/>
    </svg>
);

const ShippingIcon = ({ className = "w-5 h-5 md:w-6 md:h-6" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M3,4A2,2 0 0,0 1,6V17H3A3,3 0 0,0 6,20A3,3 0 0,0 9,17H15A3,3 0 0,0 18,20A3,3 0 0,0 21,17H23V12L20,8H17V4M17,6H19.5L21.5,9H17M6,15.5A1.5,1.5 0 0,1 7.5,17A1.5,1.5 0 0,1 6,18.5A1.5,1.5 0 0,1 4.5,17A1.5,1.5 0 0,1 6,15.5M18,15.5A1.5,1.5 0 0,1 19.5,17A1.5,1.5 0 0,1 18,18.5A1.5,1.5 0 0,1 16.5,17A1.5,1.5 0 0,1 18,15.5Z"/>
    </svg>
);

const DownloadIcon = ({ className = "w-5 h-5 md:w-6 md:h-6" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"/>
    </svg>
);

const FileIcon = ({ className = "w-5 h-5 md:w-6 md:h-6" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
    </svg>
);

const ExternalLinkIcon = ({ className = "w-4 h-4 md:w-5 md:h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
    </svg>
);

const getStatusDetails = (status) => {
    switch (status.toLowerCase()) {
        case 'delivered':
        case 'completed':
            return {
                color: 'text-green-600',
                bgColor: 'bg-green-100',
                borderColor: 'border-green-200',
                icon: (
                    <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                ),
                message: t('Your order has been successfully delivered!')
            };
        case 'shipped':
        case 'processing':
            return {
                color: 'text-blue-600',
                bgColor: 'bg-blue-100',
                borderColor: 'border-blue-200',
                icon: <ShippingIcon className="w-6 h-6 text-blue-500" />,
                message: t('Your order is on its way!')
            };
        case 'pending':
            return {
                color: 'text-yellow-600',
                bgColor: 'bg-yellow-100',
                borderColor: 'border-yellow-200',
                icon: (
                    <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,6A1,1 0 0,1 13,7A1,1 0 0,1 12,8A1,1 0 0,1 11,7A1,1 0 0,1 12,6M12,10C12.55,10 13,10.45 13,11V17C13,17.55 12.55,18 12,18C11.45,18 11,17.55 11,17V11C11,10.45 11.45,10 12,10Z"/>
                    </svg>
                ),
                message: t('Your order is being processed.')
            };
        case 'cancelled':
        case 'failed':
            return {
                color: 'text-red-600',
                bgColor: 'bg-red-100',
                borderColor: 'border-red-200',
                icon: (
                    <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/>
                    </svg>
                ),
                message: t('There was an issue with your order.')
            };
        default:
            return {
                color: 'text-gray-600',
                bgColor: 'bg-gray-100',
                borderColor: 'border-gray-200',
                icon: (
                    <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,14L6.5,9.5L7.91,8.09L11,11.18L16.59,5.59L18,7V14H11Z"/>
                    </svg>
                ),
                message: t('Order status updated.')
            };
    }
};

const getFileIcon = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    const baseClass = "w-5 h-5";
    
    switch (ext) {
        case 'pdf':
            return (
                <svg className={`${baseClass} text-red-500`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2A2,2 0 0,1 14,4V20A2,2 0 0,1 12,22H4A2,2 0 0,1 2,20V8L8,2H12M13,9V3.5L18.5,9H13Z"/>
                </svg>
            );
        case 'zip':
        case 'rar':
        case '7z':
            return (
                <svg className={`${baseClass} text-orange-500`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14,17H12V15H14M14,13H12V11H14M12,9H14V7H12M12,19H14V17H12M14,7V5H12V7M14,11V9H12V11M14,15V13H12V15M14,19V17H12V19H10V3H16V21H14V19Z"/>
                </svg>
            );
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
            return (
                <svg className={`${baseClass} text-green-500`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z"/>
                </svg>
            );
        case 'doc':
        case 'docx':
            return (
                <svg className={`${baseClass} text-blue-500`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                </svg>
            );
        default:
            return <FileIcon className={`${baseClass} text-gray-500`} />;
    }
};

const getFileTypeLabel = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    return ext.toUpperCase();
};

export default function Track({ order, files }) {
    const { t } = useTranslation();
    const statusDetails = getStatusDetails(order.status);
    const canDownload = ['accepted', 'paid', 'delivered', 'completed', 'success'].includes(
        order.status?.toLowerCase()
    );

    return (
        <GuestLayout>
            <Head title={t('Track Order')} />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
                <div className="mx-auto max-w-4xl px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600">
                            <TrackingIcon className="text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">{t('Order Tracking')}</h1>
                        <p className="mt-2 text-gray-600">{t('Track your order status and download files')}</p>
                    </div>

                    {/* Tracking Code Card */}
                    <div className="mb-8 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-200">
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-900">{t('Order Information')}</h2>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{t('Tracking Code')}</p>
                                    <p className="text-2xl font-bold text-gray-900 font-mono">#{order.tracking_code}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-600">{t('Order Status')}</p>
                                    <div className="mt-1 flex items-center justify-end space-x-2">
                                        {statusDetails.icon}
                                        <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${statusDetails.bgColor} ${statusDetails.color} ${statusDetails.borderColor}`}>
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Status Message */}
                    <div className={`mb-8 rounded-2xl border p-6 ${statusDetails.bgColor} ${statusDetails.borderColor}`}>
                        <div className="flex items-center space-x-3">
                            {statusDetails.icon}
                            <div>
                                <h3 className={`font-semibold ${statusDetails.color}`}>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </h3>
                                <p className={`text-sm ${statusDetails.color}`}>
                                    {statusDetails.message}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Postal Tracking */}
                    {order.postal_tracking_code && (
                        <div className="mb-8 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-200">
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4">
                                <div className="flex items-center space-x-3">
                                    <div className="rounded-lg bg-blue-100 p-2">
                                        <ShippingIcon className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">{t('Shipping Information')}</h3>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center space-x-3">
                                    <p className="text-sm font-medium text-gray-600">{t('Postal Tracking Code:')}</p>
                                    <span className="inline-flex items-center px-3 py-1 rounded-lg bg-blue-50 text-blue-800 font-mono text-sm border border-blue-200">
                                        {order.postal_tracking_code}
                                    </span>
                                </div>
                                <p className="mt-2 text-sm text-gray-600">
                                    {t('Use this code to track your package with the shipping carrier.')}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Downloads Section */}
                    {files.length > 0 && canDownload && (
                        <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-200">
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="rounded-lg bg-green-100 p-2">
                                            <DownloadIcon className="text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">{t('Available Downloads')}</h3>
                                            <p className="text-sm text-gray-600">{files.length} {files.length !== 1 ? t('files') : t('file')} {t('ready for download')}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                            </svg>
                                            {t('Ready')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                                    {files.map((file, idx) => (
                                        <div key={idx} className="group relative">
                                            <a 
                                                href={`/storage/${file.path}`} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-md"
                                            >
                                                <div className="flex items-start space-x-3">
                                                    <div className="flex-shrink-0 mt-1">
                                                        {getFileIcon(file.title)}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between">
                                                            <p className="text-sm font-medium text-gray-900 truncate group-hover:text-green-600 transition-colors">
                                                                {file.title}
                                                            </p>
                                                            <ExternalLinkIcon className="w-4 h-4 text-gray-400 group-hover:text-green-500 transition-colors" />
                                                        </div>
                                                        <div className="flex items-center space-x-2 mt-1">
                                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-200 text-gray-800">
                                                                {getFileTypeLabel(file.title)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {/* Download overlay */}
                                                <div className="absolute inset-0 bg-green-500 bg-opacity-0 group-hover:bg-opacity-5 rounded-xl transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                    <div className="flex items-center space-x-2 text-green-600 font-medium">
                                                        <DownloadIcon className="w-4 h-4" />
                                                        <span className="text-sm">{t('Download')}</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    ))}
                                </div>

                                {/* Download All Button */}
                                {files.length > 1 && (
                                    <div className="mt-6 pt-4 border-t border-gray-200">
                                        <button className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md">
                                            <DownloadIcon className="w-5 h-5 mr-2" />
                                            {t('Download All Files')}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Help Section */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            {t('Need help with your order?')}
                            <a href="/contact" className="ml-1 font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                                {t('Contact Support')}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

// Custom SVG Icons - Mobile Responsive
const DownloadIcon = ({ className = "w-4 h-4 sm:w-5 sm:h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"/>
    </svg>
);

const FileIcon = ({ className = "w-4 h-4 sm:w-5 sm:h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
    </svg>
);

const OrderIcon = ({ className = "w-4 h-4 sm:w-5 sm:h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M17,18C17,19.09 16.09,20 15,20H5C3.91,20 3,19.09 3,18V8H21V18M19,5H17V3C17,1.89 16.1,1 15,1H9C7.89,1 7,1.89 7,3V5H5C3.9,5 3,5.9 3,7H21C21,5.9 20.1,5 19,5M15,5H9V3H15V5Z"/>
    </svg>
);

const FolderIcon = ({ className = "w-4 h-4 sm:w-5 sm:h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z"/>
    </svg>
);

const ExternalLinkIcon = ({ className = "w-3 h-3 sm:w-4 sm:h-4" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
    </svg>
);

const getFileExtension = (filename) => {
    return filename.split('.').pop().toLowerCase();
};

const getFileIcon = (filename) => {
    const ext = getFileExtension(filename);
    const baseClass = "w-4 h-4 sm:w-5 sm:h-5";
    
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
    const ext = getFileExtension(filename);
    return ext.toUpperCase();
};

export default function Downloads({ orders, totalOrders, totalFiles, totalVouchers }) {
    const { t } = useTranslation();
    const filesCount = typeof totalFiles === 'number' ? totalFiles : orders.data.reduce((sum, order) => sum + order.files.length, 0);
    const vouchersCount = typeof totalVouchers === 'number' ? totalVouchers : orders.data.reduce((sum, order) => sum + (order.vouchers ? order.vouchers.length : 0), 0);
    const ordersCount = typeof totalOrders === 'number' ? totalOrders : orders.total;

    const sortedData = [...orders.data].sort((a, b) => b.id - a.id);

    return (
        <AuthenticatedLayout 
            header={
                <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="p-1.5 sm:p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                        <DownloadIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{t('Downloads')}</h2>
                        <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">{t('Access your purchased files and digital content')}</p>
                    </div>
                </div>
            }
        >
            <Head title={t('Downloads')} />
            
            <div className="py-4 sm:py-8">
                <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
                    {/* Stats Cards - Mobile Responsive */}
                    <div className="mb-6 sm:mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        <div className="relative overflow-hidden rounded-lg sm:rounded-xl bg-white p-4 sm:p-6 shadow-sm ring-1 ring-gray-200">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="rounded-lg bg-blue-100 p-2 sm:p-3">
                                        <OrderIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                                    </div>
                                </div>
                                <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{t('Total Orders')}</p>
                                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{ordersCount}</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-lg sm:rounded-xl bg-white p-4 sm:p-6 shadow-sm ring-1 ring-gray-200">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="rounded-lg bg-green-100 p-2 sm:p-3">
                                        <FileIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                                    </div>
                                </div>
                                <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{t('Available Files')}</p>
                                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{filesCount}</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-lg sm:rounded-xl bg-white p-4 sm:p-6 shadow-sm ring-1 ring-gray-200">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="rounded-lg bg-emerald-100 p-2 sm:p-3">
                                        <DownloadIcon className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                                    </div>
                                </div>
                                <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{t('Voucher Codes')}</p>
                                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{vouchersCount}</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-lg sm:rounded-xl bg-white p-4 sm:p-6 shadow-sm ring-1 ring-gray-200 sm:col-span-2 lg:col-span-1">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="rounded-lg bg-purple-100 p-2 sm:p-3">
                                        <FolderIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                                    </div>
                                </div>
                                <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{t('Storage Used')}</p>
                                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">2.4 GB</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Orders List - Mobile Responsive */}
                    <div className="space-y-4 sm:space-y-6">
                        {sortedData.map((order) => (
                            <div key={order.id} className="overflow-hidden bg-white shadow-lg sm:shadow-xl rounded-lg sm:rounded-2xl ring-1 ring-gray-200">
                                {/* Order Header - Mobile Responsive */}
                                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm">
                                                <OrderIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                                                    Order #{order.tracking_code}
                                                </h3>
                                                <p className="text-xs sm:text-sm text-gray-600">
                                                    {order.files.length} {order.files.length !== 1 ? t('files') : t('file')} {t('available')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                                </svg>
                                                {t('Ready')}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Files List - Mobile Responsive */}
                                <div className="p-4 sm:p-6">
                                    <div className="grid gap-3 sm:gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                                        {order.files.map((file, idx) => (
                                            <div key={idx} className="group relative">
                                                <a 
                                                    href={`/storage/${file.path}`} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="block p-3 sm:p-4 bg-gray-50 hover:bg-gray-100 rounded-lg sm:rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-md"
                                                >
                                                    <div className="flex items-start space-x-3">
                                                        <div className="flex-shrink-0 mt-0.5 sm:mt-1">
                                                            {getFileIcon(file.title)}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-start justify-between">
                                                                <p className="text-sm font-medium text-gray-900 truncate group-hover:text-indigo-600 transition-colors pr-2">
                                                                    {file.title}
                                                                </p>
                                                                <ExternalLinkIcon className="flex-shrink-0 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                                                            </div>
                                                            <div className="flex items-center space-x-2 mt-1">
                                                                <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded text-xs font-medium bg-gray-200 text-gray-800">
                                                                    {getFileTypeLabel(file.title)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Download overlay - Hidden on mobile */}
                                                    <div className="absolute inset-0 bg-indigo-500 bg-opacity-0 group-hover:bg-opacity-5 rounded-lg sm:rounded-xl transition-all duration-200 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                        <div className="flex items-center space-x-2 text-indigo-600 font-medium">
                                                            <DownloadIcon className="w-4 h-4" />
                                                            <span className="text-sm">{t('Download')}</span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Bulk Download Option - Mobile Responsive */}
                                    {order.files.length > 1 && (
                                        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
                                            <button className="inline-flex items-center w-full sm:w-auto justify-center px-4 py-2.5 sm:py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md">
                                                <DownloadIcon className="w-4 h-4 mr-2" />
                                                {t('Download All Files')}
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {order.vouchers && order.vouchers.length > 0 && (
                                    <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50">
                                        <h4 className="font-semibold text-gray-900 mb-3">{t('Voucher Codes')}</h4>
                                        <ul className="space-y-2">
                                            {order.vouchers.map((v, i) => (
                                                <li key={i} className="px-3 py-2 bg-white rounded-lg border border-gray-200">
                                                    <span className="font-medium">{v.product}:</span> {v.code}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Pagination - Mobile Responsive */}
                    {orders.links && orders.links.length > 3 && (
                        <div className="mt-6 flex flex-wrap justify-center gap-1 sm:gap-2 py-4">
                            {orders.links.map((l, idx) => (
                                <Link
                                    key={idx}
                                    href={l.url || '#'}
                                    className={`px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg border transition-colors duration-200 ${
                                        l.active
                                            ? 'bg-blue-600 border-blue-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: l.label }}
                                />
                            ))}
                        </div>
                    )}

                    {/* Empty State - Mobile Responsive */}
                    {orders.data.length === 0 && (
                        <div className="text-center py-12 sm:py-16">
                            <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <DownloadIcon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-400" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">{t('No downloads available')}</h3>
                            <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6 px-4">{t("You don't have any downloadable files yet.")}</p>
                            <button className="inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200 text-sm sm:text-base">
                                {t('Browse Products')}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
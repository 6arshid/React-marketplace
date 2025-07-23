import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import SearchBar from '@/Components/SearchBar';
import Pagination from '@/Components/Pagination';
import AddTrackingCodeForm from './Partials/AddTrackingCodeForm';

// Custom SVG Icons
const OrderIcon = ({ className = "w-5 h-5 md:w-6 md:h-6" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M17,18C17,19.09 16.09,20 15,20H5C3.91,20 3,19.09 3,18V8H21V18M19,5H17V3C17,1.89 16.1,1 15,1H9C7.89,1 7,1.89 7,3V5H5C3.9,5 3,5.9 3,7H21C21,5.9 20.1,5 19,5M15,5H9V3H15V5Z"/>
    </svg>
);

const TrackingIcon = ({ className = "w-4 h-4 md:w-5 md:h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M2 3H7L8.5 9.5H19L17 15H8.5L7 3H2V1H7.5C7.8 1 8 1.2 8.2 1.4L9.5 9.5H19C19.6 9.5 20 9.9 20 10.5C20 10.7 19.9 10.9 19.8 11L17.3 16.5C17.1 16.8 16.8 17 16.5 17H8.5C8.2 17 8 16.8 7.8 16.6L2 3Z"/>
    </svg>
);

const CurrencyIcon = ({ className = "w-4 h-4 md:w-5 md:h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
    </svg>
);

const SellerIcon = ({ className = "w-4 h-4 md:w-5 md:h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
    </svg>
);

const ShippingIcon = ({ className = "w-4 h-4 md:w-5 md:h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M3,4A2,2 0 0,0 1,6V17H3A3,3 0 0,0 6,20A3,3 0 0,0 9,17H15A3,3 0 0,0 18,20A3,3 0 0,0 21,17H23V12L20,8H17V4M17,6H19.5L21.5,9H17M6,15.5A1.5,1.5 0 0,1 7.5,17A1.5,1.5 0 0,1 6,18.5A1.5,1.5 0 0,1 4.5,17A1.5,1.5 0 0,1 6,15.5M18,15.5A1.5,1.5 0 0,1 19.5,17A1.5,1.5 0 0,1 18,18.5A1.5,1.5 0 0,1 16.5,17A1.5,1.5 0 0,1 18,15.5Z"/>
    </svg>
);

const ViewIcon = ({ className = "w-4 h-4 md:w-5 md:h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"/>
    </svg>
);

const DigitalIcon = ({ className = "w-4 h-4 md:w-5 md:h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"/>
    </svg>
);

const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
        case 'delivered':
        case 'completed':
            return 'bg-green-100 text-green-800 border-green-200';
        case 'shipped':
        case 'processing':
            return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'pending':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'cancelled':
        case 'failed':
            return 'bg-red-100 text-red-800 border-red-200';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
        case 'delivered':
        case 'completed':
            return (
                <svg className="w-4 h-4 md:w-5 md:h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
            );
        case 'shipped':
        case 'processing':
            return (
                <svg className="w-4 h-4 md:w-5 md:h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3,4A2,2 0 0,0 1,6V17H3A3,3 0 0,0 6,20A3,3 0 0,0 9,17H15A3,3 0 0,0 18,20A3,3 0 0,0 21,17H23V12L20,8H17V4M17,6H19.5L21.5,9H17M6,15.5A1.5,1.5 0 0,1 7.5,17A1.5,1.5 0 0,1 6,18.5A1.5,1.5 0 0,1 4.5,17A1.5,1.5 0 0,1 6,15.5M18,15.5A1.5,1.5 0 0,1 19.5,17A1.5,1.5 0 0,1 18,18.5A1.5,1.5 0 0,1 16.5,17A1.5,1.5 0 0,1 18,15.5Z"/>
                </svg>
            );
        case 'pending':
            return (
                <svg className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,6A1,1 0 0,1 13,7A1,1 0 0,1 12,8A1,1 0 0,1 11,7A1,1 0 0,1 12,6M12,10C12.55,10 13,10.45 13,11V17C13,17.55 12.55,18 12,18C11.45,18 11,17.55 11,17V11C11,10.45 11.45,10 12,10Z"/>
                </svg>
            );
        default:
            return (
                <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/>
                </svg>
            );
    }
};

export default function Index({ orders }) {
    const formatAmount = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const totalOrders = orders.length;
    const totalAmount = orders.reduce((sum, order) => sum + parseFloat(order.amount), 0);
    const completedOrders = orders.filter(order => order.status.toLowerCase() === 'delivered' || order.status.toLowerCase() === 'completed').length;
    const digitalOrders = orders.filter(order => order.is_digital).length;

    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => setCurrentPage(1), [search]);

    const filteredOrders = orders.filter(o =>
        `${o.tracking_code} ${o.seller.name} ${o.status}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );
    const totalPages = Math.ceil(filteredOrders.length / 10);
    const paginatedOrders = filteredOrders.slice((currentPage - 1) * 10, currentPage * 10);

    return (
        <AuthenticatedLayout 
            header={
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                        <OrderIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
                        <p className="text-sm text-gray-600">Track and manage your order history</p>
                    </div>
                </div>
            }
        >
            <Head title="Orders" />
            
            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Stats Cards */}
                    <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="relative overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="rounded-lg bg-blue-100 p-3">
                                        <OrderIcon className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                                    <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="rounded-lg bg-green-100 p-3">
                                        <CurrencyIcon className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Spent</p>
                                    <p className="text-2xl font-bold text-gray-900">{formatAmount(totalAmount)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="rounded-lg bg-purple-100 p-3">
                                        <svg className="w-5 h-5 md:w-6 md:h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Completed</p>
                                    <p className="text-2xl font-bold text-gray-900">{completedOrders}</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="rounded-lg bg-orange-100 p-3">
                                        <DigitalIcon className="w-5 h-5 md:w-6 md:h-6 text-orange-600" />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Digital Items</p>
                                    <p className="text-2xl font-bold text-gray-900">{digitalOrders}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Table */}
                    <div className="overflow-hidden bg-white shadow-xl sm:rounded-2xl ring-1 ring-gray-200">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <h3 className="text-lg font-semibold text-gray-900">Order History</h3>
                                <SearchBar value={search} onChange={setSearch} placeholder="Search orders" />
                            </div>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            <div className="flex items-center space-x-2">
                                                <TrackingIcon className="text-gray-400" />
                                                <span>Tracking</span>
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            <div className="flex items-center space-x-2">
                                                <CurrencyIcon className="text-gray-400" />
                                                <span>Amount</span>
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            <div className="flex items-center space-x-2">
                                                <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                                </svg>
                                                <span>Status</span>
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            <div className="flex items-center space-x-2">
                                                <SellerIcon className="text-gray-400" />
                                                <span>Seller</span>
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            <div className="flex items-center space-x-2">
                                                <ShippingIcon className="text-gray-400" />
                                                <span>Shipping</span>
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            <div className="flex items-center space-x-2">
                                                <ViewIcon className="text-gray-400" />
                                                <span>Action</span>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {paginatedOrders.map((order) => (
                                        <tr 
                                            key={order.id} 
                                            className="hover:bg-gray-50 transition-colors duration-200"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                                                        #{order.tracking_code}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-lg font-bold text-gray-900">
                                                    {formatAmount(order.amount)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center space-x-2">
                                                    {getStatusIcon(order.status)}
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                                        {order.seller.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {order.seller.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center space-x-2">
                                                    {order.is_digital ? (
                                                        <>
                                                            <DigitalIcon className="text-green-500" />
                                                            <span className="text-sm text-green-600 font-medium">
                                                                Download Available
                                                            </span>
                                                        </>
                                                    ) : order.postal_tracking_code ? (
                                                        <>
                                                            <ShippingIcon className="text-blue-500" />
                                                            <span className="text-sm font-mono text-gray-900 bg-blue-50 px-2 py-1 rounded">
                                                                {order.postal_tracking_code}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <AddTrackingCodeForm order={order} />
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Link 
                                                    href={route('orders.track', order.tracking_code)}
                                                    className="inline-flex items-center px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 space-x-2"
                                                >
                                                    <ViewIcon />
                                                    <span>Track</span>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

                        {filteredOrders.length === 0 && (
                            <div className="text-center py-16">
                                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <OrderIcon className="w-12 h-12 md:w-16 md:h-16 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 mb-2">No orders found</h3>
                                <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
                                <button className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200">
                                    Start Shopping
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
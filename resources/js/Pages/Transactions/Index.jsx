import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import SearchBar from '@/Components/SearchBar';
import Pagination from '@/Components/Pagination';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

// Custom SVG Icons - Mobile Responsive
const StatusIcon = ({ status }) => {
    if (status === 'completed' || status === 'success') {
        return (
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
        );
    } else if (status === 'pending') {
        return (
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,6A1,1 0 0,1 13,7A1,1 0 0,1 12,8A1,1 0 0,1 11,7A1,1 0 0,1 12,6M12,10C12.55,10 13,10.45 13,11V17C13,17.55 12.55,18 12,18C11.45,18 11,17.55 11,17V11C11,10.45 11.45,10 12,10Z"/>
            </svg>
        );
    } else {
        return (
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/>
            </svg>
        );
    }
};

const CalendarIcon = () => (
    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
    </svg>
);

const CurrencyIcon = () => (
    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
    </svg>
);

const ReferenceIcon = () => (
    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
    </svg>
);

const TransactionIcon = () => (
    <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 6h18l-2 9H6l-1-4H2V9h2l1 4h11l1-4H3V6z M7 18c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zm10 0c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2z"/>
    </svg>
);

export default function Index({ transactions }) {
    const { t } = useTranslation();
    const user = usePage().props.auth.user;
    
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'completed':
            case 'success':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'failed':
            case 'declined':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const [transactionList, setTransactionList] = useState(transactions);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const successAmount = transactionList
        .filter((t) => t.status === 'success')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const { data, setData, post, processing, errors, reset } = useForm({ amount: successAmount });

    useEffect(() => {
        setData('amount', successAmount);
    }, [successAmount]);

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    const submitRequest = (e) => {
        e.preventDefault();
        post(route('transactions.request'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    useEffect(() => {
        const interval = setInterval(async () => {
            const res = await axios.get(route('transactions.money'));
            setTransactionList(res.data);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const sortedTransactions = [...transactionList].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    const filteredTransactions = sortedTransactions.filter((t) =>
        `${t.reference} ${t.status}`.toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.ceil(filteredTransactions.length / 10);
    const paginatedTransactions = filteredTransactions.slice(
        (currentPage - 1) * 10,
        currentPage * 10
    );

    return (
        <AuthenticatedLayout 
            header={
                <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                        <TransactionIcon />
                    </div>
                    <div>
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{t('Transactions')}</h2>
                        <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">{t('Manage and track your transaction history')}</p>
                    </div>
                </div>
            }
        >
            <Head title="Transactions" />
            
            <div className="py-4 sm:py-8">
                <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
                    {/* Stats Cards - Mobile Responsive */}
                    <div className="mb-6 sm:mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        <div className="relative overflow-hidden rounded-lg sm:rounded-xl bg-white p-4 sm:p-6 shadow-sm ring-1 ring-gray-200">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="rounded-lg bg-green-100 p-2 sm:p-3">
                                        <CurrencyIcon />
                                    </div>
                                </div>
                                <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{t('Total Amount')}</p>
                                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                                        {formatAmount(
                                            transactionList
                                                .filter((t) => t.status === 'success')
                                                .reduce((sum, t) => sum + parseFloat(t.amount), 0)
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-lg sm:rounded-xl bg-white p-4 sm:p-6 shadow-sm ring-1 ring-gray-200">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="rounded-lg bg-blue-100 p-2 sm:p-3">
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{t('Total Transactions')}</p>
                                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{transactionList.length}</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-lg sm:rounded-xl bg-white p-4 sm:p-6 shadow-sm ring-1 ring-gray-200 sm:col-span-2 lg:col-span-1">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="rounded-lg bg-purple-100 p-2 sm:p-3">
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{t('Success Rate')}</p>
                                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                                        {transactionList.length > 0 ? Math.round((transactionList.filter(t => t.status === 'completed').length / transactionList.length) * 100) : 0}%
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payout Request Form - Mobile Responsive */}
                    {!user.pro_panel && (
                        <div className="mb-6 sm:mb-8 bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm ring-1 ring-gray-200">
                            <form onSubmit={submitRequest} className="space-y-4 sm:space-y-0 sm:flex sm:items-end sm:space-x-4">
                                <div className="flex-1">
                                    <InputLabel htmlFor="amount" value={t('Available Amount')} className="text-sm sm:text-base" />
                                    <div className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 bg-gray-100 text-sm sm:text-base font-medium">
                                        {formatAmount(successAmount)}
                                    </div>
                                    <InputError message={errors.amount} className="mt-2 text-sm" />
                                </div>
                                <PrimaryButton 
                                    disabled={processing}
                                    className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base"
                                >
                                    {processing ? t('Processing...') : t('Request Payout')}
                                </PrimaryButton>
                            </form>
                        </div>
                    )}

                    {/* Main Content - Mobile Responsive */}
                    <div className="overflow-hidden bg-white shadow-lg sm:shadow-xl rounded-lg sm:rounded-2xl ring-1 ring-gray-200">
                        <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900">{t('Recent Transactions')}</h3>
                                <div className="w-full sm:w-auto">
                                    <SearchBar 
                                        value={search} 
                                        onChange={setSearch} 
                                        placeholder={t('Search transactions')}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        {/* Mobile Card View */}
                        <div className="sm:hidden">
                            {paginatedTransactions.length > 0 ? (
                                <div className="divide-y divide-gray-200">
                                    {paginatedTransactions.map((transaction) => (
                                        <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center space-x-2">
                                                    <StatusIcon status={transaction.status} />
                                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(transaction.status)}`}>
                                                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                                    </span>
                                                </div>
                                                <div className="text-lg font-bold text-gray-900">
                                                    {formatAmount(transaction.amount)}
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between text-sm text-gray-500">
                                                <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">
                                                    {transaction.reference}
                                                </span>
                                                <span>{formatDate(transaction.created_at)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">{t('No transactions')}</h3>
                                    <p className="mt-1 text-xs text-gray-500">{t('Get started by creating your first transaction.')}</p>
                                </div>
                            )}
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden sm:block overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            <div className="flex items-center space-x-2">
                                                <CurrencyIcon />
                                                <span>{t('Amount')}</span>
                                            </div>
                                        </th>
                                        <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            <div className="flex items-center space-x-2">
                                                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                                </svg>
                                                <span>{t('Status')}</span>
                                            </div>
                                        </th>
                                        <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            <div className="flex items-center space-x-2">
                                                <ReferenceIcon />
                                                <span>{t('Reference')}</span>
                                            </div>
                                        </th>
                                        <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            <div className="flex items-center space-x-2">
                                                <CalendarIcon />
                                                <span>{t('Date')}</span>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {paginatedTransactions.map((transaction) => (
                                        <tr 
                                            key={transaction.id} 
                                            className="hover:bg-gray-50 transition-colors duration-200"
                                        >
                                            <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                                                <div className="text-sm lg:text-base font-bold text-gray-900">
                                                    {formatAmount(transaction.amount)}
                                                </div>
                                            </td>
                                            <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                                                <div className="flex items-center space-x-2">
                                                    <StatusIcon status={transaction.status} />
                                                    <span className={`inline-flex items-center px-2 lg:px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(transaction.status)}`}>
                                                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                                                <span className="text-xs lg:text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                                                    {transaction.reference}
                                                </span>
                                            </td>
                                            <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                                                <span className="text-xs lg:text-sm text-gray-600">
                                                    {formatDate(transaction.created_at)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {filteredTransactions.length === 0 && (
                                <div className="text-center py-8 lg:py-12">
                                    <svg className="mx-auto h-10 w-10 lg:h-12 lg:w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">{t('No transactions')}</h3>
                                    <p className="mt-1 text-sm text-gray-500">{t('Get started by creating your first transaction.')}</p>
                                </div>
                            )}
                        </div>

                        {totalPages > 1 && (
                            <div className="px-4 sm:px-6 py-4">
                                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
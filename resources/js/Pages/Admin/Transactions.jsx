import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Transactions({ transactions }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [transactionList, setTransactionList] = useState(transactions);

    useEffect(() => {
        const interval = setInterval(async () => {
            const res = await axios.get(route('admin.transactions.money'));
            setTransactionList(res.data);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const pay = async (id) => {
        await axios.post(route('admin.transactions.pay', id));
        setTransactionList((prev) =>
            prev.map((t) => (t.id === id ? { ...t, status: 'paid' } : t))
        );
        const res = await axios.get(route('admin.transactions.money'));
        setTransactionList(res.data);
    };

    const closeModal = () => setSelectedUser(null);

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Transactions</h2>}>
            <Head title="Transactions" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left">User</th>
                                    <th className="px-4 py-2">Amount</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2">Reference</th>
                                    <th className="px-4 py-2">Date</th>
                                    <th className="px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactionList.map((t) => (
                                    <tr key={t.id}>
                                        <td className={`border px-4 py-2 ${t.status === 'paid' ? 'line-through text-gray-400' : ''}`}>{t.user?.name}</td>
                                        <td className={`border px-4 py-2 ${t.status === 'paid' ? 'line-through text-gray-400' : ''}`}>${t.amount}</td>
                                        <td className={`border px-4 py-2 ${t.status === 'paid' ? 'line-through text-gray-400' : ''}`}>{t.status}</td>
                                        <td className={`border px-4 py-2 ${t.status === 'paid' ? 'line-through text-gray-400' : ''}`}>
                                            <button
                                                onClick={() => setSelectedUser(t.user)}
                                                className="text-blue-600 hover:underline"
                                            >
                                                {t.reference}
                                            </button>
                                        </td>
                                        <td className={`border px-4 py-2 ${t.status === 'paid' ? 'line-through text-gray-400' : ''}`}>{t.created_at}</td>
                                        <td className="border px-4 py-2 text-center">
                                            {t.status === 'success' || t.status === 'completed' ? (
                                                <PrimaryButton onClick={() => pay(t.id)}>
                                                    Pay ${((t.amount * 0.98)).toFixed(2)}
                                                </PrimaryButton>
                                            ) : t.status === 'paid' ? (
                                                <PrimaryButton disabled>Paid</PrimaryButton>
                                            ) : null}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Modal show={Boolean(selectedUser)} onClose={closeModal}>
                <div className="p-6">
                    <h2 className="mb-4 text-lg font-medium text-gray-900">Buyer Details</h2>
                    {selectedUser && (
                        <div className="space-y-1">
                            <p>
                                <strong>Name:</strong> {selectedUser.name}
                            </p>
                            {selectedUser.username && (
                                <p>
                                    <strong>Username:</strong> {selectedUser.username}
                                </p>
                            )}
                            {selectedUser.public_email && (
                                <p>
                                    <strong>Email:</strong> {selectedUser.public_email}
                                </p>
                            )}
                            {selectedUser.whatsapp_number && (
                                <p>
                                    <strong>WhatsApp:</strong> {selectedUser.whatsapp_number}
                                </p>
                            )}
                            {selectedUser.telegram_username && (
                                <p>
                                    <strong>Telegram:</strong> {selectedUser.telegram_username}
                                </p>
                            )}
                            {selectedUser.trc20_usdt_wallet && (
                                <p>
                                    <strong>USDT Wallet:</strong> {selectedUser.trc20_usdt_wallet}
                                </p>
                            )}
                            {selectedUser.bitcoin_wallet && (
                                <p>
                                    <strong>Bitcoin Wallet:</strong> {selectedUser.bitcoin_wallet}
                                </p>
                            )}
                            {selectedUser.iban && (
                                <p>
                                    <strong>IBAN:</strong> {selectedUser.iban}
                                </p>
                            )}
                            {selectedUser.swift_code && (
                                <p>
                                    <strong>SWIFT Code:</strong> {selectedUser.swift_code}
                                </p>
                            )}
                        </div>
                    )}
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Close</SecondaryButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}

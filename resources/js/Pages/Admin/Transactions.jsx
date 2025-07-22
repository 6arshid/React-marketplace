import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { useState } from 'react';

export default function Transactions({ transactions }) {
    const [selectedUser, setSelectedUser] = useState(null);

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
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((t) => (
                                    <tr key={t.id}>
                                        <td className="border px-4 py-2">{t.user?.name}</td>
                                        <td className="border px-4 py-2">${t.amount}</td>
                                        <td className="border px-4 py-2">{t.status}</td>
                                        <td className="border px-4 py-2">
                                            <button
                                                onClick={() => setSelectedUser(t.user)}
                                                className="text-blue-600 hover:underline"
                                            >
                                                {t.reference}
                                            </button>
                                        </td>
                                        <td className="border px-4 py-2">{t.created_at}</td>
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

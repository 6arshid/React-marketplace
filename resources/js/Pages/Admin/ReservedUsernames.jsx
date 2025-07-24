import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function ReservedUsernames({ reservedUsernames }) {
    const { t } = useTranslation();
    const { data, setData, post, processing, reset, delete: destroy } = useForm({
        username: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.reserved-usernames.store'), {
            preserveScroll: true,
            onSuccess: () => reset('username'),
        });
    };

    const deleteUsername = (id) => {
        destroy(route('admin.reserved-usernames.destroy', id), {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">{t('Reserved Usernames')}</h2>}>
            <Head title={t('Reserved Usernames')} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-4 sm:px-6 lg:px-8">
                    <form onSubmit={submit} className="bg-white p-4 shadow sm:rounded-lg space-y-2">
                        <div>
                            <InputLabel htmlFor="username" value={t('Username')} />
                            <TextInput id="username" value={data.username} className="mt-1 block w-full" onChange={(e) => setData('username', e.target.value)} required />
                        </div>
                        <PrimaryButton disabled={processing}>{t('Add')}</PrimaryButton>
                    </form>
                    <div className="bg-white p-4 shadow sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700">{t('Username')}</th>
                                    <th className="px-3 py-2" />
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {reservedUsernames.map((u) => (
                                    <tr key={u.id}>
                                        <td className="px-3 py-2 text-sm text-gray-900">{u.username}</td>
                                        <td className="px-3 py-2 text-right">
                                            <button onClick={() => deleteUsername(u.id)} className="text-red-600 hover:underline">{t('Delete')}</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

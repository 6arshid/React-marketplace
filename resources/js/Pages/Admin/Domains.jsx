import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Domains({ domains, ns1: initialNs1, ns2: initialNs2 }) {
    const { t } = useTranslation();
    const { post, patch, delete: destroy } = useForm();
    const {
        data,
        setData,
        post: saveDefaults,
        processing,
        errors,
    } = useForm({
        ns1: initialNs1 || '',
        ns2: initialNs2 || '',
    });

    const [editing, setEditing] = useState(null);
    const [ns1, setNs1] = useState('');
    const [ns2, setNs2] = useState('');

    const startEdit = (domain) => {
        setEditing(domain.id);
        setNs1(domain.ns1 || '');
        setNs2(domain.ns2 || '');
    };

    const cancelEdit = () => {
        setEditing(null);
        setNs1('');
        setNs2('');
    };

    const saveEdit = (id) => {
        patch(route('admin.domains.update', id), {
            preserveScroll: true,
            ns1,
            ns2,
            onSuccess: cancelEdit,
        });
    };

    const approve = (id) => post(route('admin.domains.approve', id));
    const reject = (id) => post(route('admin.domains.reject', id));
    const remove = (id) => destroy(route('admin.domains.destroy', id));

    const submitDefaults = (e) => {
        e.preventDefault();
        saveDefaults(route('admin.domains.defaults'), { preserveScroll: true });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">{t('Domains')}</h2>}>
            <Head title={t('Domains')} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl bg-white p-4 shadow sm:rounded-lg">
                    <form onSubmit={submitDefaults} className="mb-6 flex items-end space-x-4">
                        <div>
                            <InputLabel htmlFor="ns1" value={t('Default NS1')} />
                            <TextInput id="ns1" value={data.ns1} onChange={(e) => setData('ns1', e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.ns1} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="ns2" value={t('Default NS2')} />
                            <TextInput id="ns2" value={data.ns2} onChange={(e) => setData('ns2', e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.ns2} className="mt-2" />
                        </div>
                        <div className="pt-4">
                            <PrimaryButton disabled={processing}>{t('Save')}</PrimaryButton>
                        </div>
                    </form>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700">{t('Domain')}</th>
                                <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700">User</th>
                                <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700">NS1</th>
                                <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700">NS2</th>
                                <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
                                <th className="px-3 py-2" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {domains.data.map((d) => (
                                <tr key={d.id}>
                                    <td className="px-3 py-2 text-sm text-gray-900">{d.domain}</td>
                                    <td className="px-3 py-2 text-sm text-gray-900">{d.user.name}</td>
                                    <td className="px-3 py-2 text-sm text-gray-900">
                                        {editing === d.id ? (
                                            <input
                                                value={ns1}
                                                onChange={(e) => setNs1(e.target.value)}
                                                className="w-full rounded border-gray-300"
                                            />
                                        ) : (
                                            d.ns1 || '-'
                                        )}
                                    </td>
                                    <td className="px-3 py-2 text-sm text-gray-900">
                                        {editing === d.id ? (
                                            <input
                                                value={ns2}
                                                onChange={(e) => setNs2(e.target.value)}
                                                className="w-full rounded border-gray-300"
                                            />
                                        ) : (
                                            d.ns2 || '-'
                                        )}
                                    </td>
                                    <td className="px-3 py-2 text-sm text-gray-900">{d.status}</td>
                                    <td className="px-3 py-2 text-sm text-right space-x-2">
                                        {editing === d.id ? (
                                            <>
                                                <button onClick={() => saveEdit(d.id)} className="text-green-600 hover:underline">{t('Save')}</button>
                                                <button onClick={cancelEdit} className="text-gray-600 hover:underline">{t('Cancel')}</button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => startEdit(d)} className="text-blue-600 hover:underline">{t('Edit')}</button>
                                                <button onClick={() => approve(d.id)} className="text-green-600 hover:underline">{t('Accept')}</button>
                                                <button onClick={() => reject(d.id)} className="text-yellow-600 hover:underline">{t('Reject')}</button>
                                                <button onClick={() => remove(d.id)} className="text-red-600 hover:underline">{t('Delete')}</button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4 flex gap-2">
                        {domains.links.map((l, idx) => (
                            <a key={idx} href={l.url || '#'} className={l.active ? 'font-bold' : ''} dangerouslySetInnerHTML={{ __html: l.label }} />
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

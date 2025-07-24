import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useTranslation, Trans } from 'react-i18next';

export default function Domains({ domains }) {
    const { t } = useTranslation();
    const { post, patch, delete: destroy } = useForm();

    const approve = (id) => post(route('admin.domains.approve', id));
    const reject = (id) => post(route('admin.domains.reject', id));
    const remove = (id) => destroy(route('admin.domains.destroy', id));

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">{t('Domains')}</h2>}>
            <Head title={t('Domains')} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl bg-white p-4 shadow sm:rounded-lg">
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
                                    <td className="px-3 py-2 text-sm text-gray-900">{d.ns1 || '-'}</td>
                                    <td className="px-3 py-2 text-sm text-gray-900">{d.ns2 || '-'}</td>
                                    <td className="px-3 py-2 text-sm text-gray-900">{d.status}</td>
                                    <td className="px-3 py-2 text-sm text-right space-x-2">
                                        <button onClick={() => approve(d.id)} className="text-green-600 hover:underline">{t('Accept')}</button>
                                        <button onClick={() => reject(d.id)} className="text-yellow-600 hover:underline">{t('Reject')}</button>
                                        <button onClick={() => remove(d.id)} className="text-red-600 hover:underline">{t('Delete')}</button>
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

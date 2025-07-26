import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import { Head, useForm, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function Languages({ languages }) {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors, reset, delete: destroy } = useForm({
        name: '',
        code: '',
        direction: 'ltr',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.languages.store'), {
            preserveScroll: true,
            onSuccess: () => reset('name', 'code', 'direction'),
        });
    };

    const deleteLanguage = (id) => {
        destroy(route('admin.languages.destroy', id), { preserveScroll: true });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">{t('Languages')}</h2>}>
            <Head title={t('Languages')} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-4 sm:px-6 lg:px-8">
                    <form onSubmit={submit} className="bg-white p-4 shadow sm:rounded-lg space-y-2">
                        <div>
                            <InputLabel htmlFor="name" value={t('Language Name')} />
                            <TextInput id="name" value={data.name} className="mt-1 block w-full" onChange={(e) => setData('name', e.target.value)} required />
                        </div>
                        <div>
                            <InputLabel htmlFor="code" value={t('Language Code')} />
                            <TextInput id="code" value={data.code} className="mt-1 block w-full" onChange={(e) => setData('code', e.target.value)} required />
                        </div>
                        <div>
                            <InputLabel htmlFor="direction" value={t('Direction')} />
                            <select id="direction" value={data.direction} onChange={(e) => setData('direction', e.target.value)} className="mt-1 block w-full rounded border-gray-300">
                                <option value="ltr">{t('LTR')}</option>
                                <option value="rtl">{t('RTL')}</option>
                            </select>
                        </div>
                        <PrimaryButton disabled={processing}>{t('Add')}</PrimaryButton>
                    </form>
                    <div className="bg-white p-4 shadow sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700">{t('Language Name')}</th>
                                    <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700">{t('Language Code')}</th>
                                    <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700">{t('Direction')}</th>
                                    <th className="px-3 py-2" />
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {languages.map((l) => (
                                    <tr key={l.id}>
                                        <td className="px-3 py-2 text-sm text-gray-900">{l.name}</td>
                                        <td className="px-3 py-2 text-sm text-gray-900">{l.code}</td>
                                        <td className="px-3 py-2 text-sm text-gray-900">{l.direction}</td>
                                        <td className="px-3 py-2 space-x-2 text-right">
                                            <Link href={route('admin.languages.edit', l.id)} className="text-indigo-600 hover:underline">
                                                {t('Edit')}
                                            </Link>
                                            <button onClick={() => deleteLanguage(l.id)} className="text-red-600 hover:underline">
                                                {t('Delete')}
                                            </button>
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

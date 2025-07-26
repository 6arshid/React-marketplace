import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export default function Edit({ language, baseTranslations }) {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors } = useForm({
        name: language.name || '',
        code: language.code || '',
        direction: language.direction || 'ltr',
        translations: '',
    });

    const [translationsObj, setTranslationsObj] = useState(language.translations || {});
    const [page, setPage] = useState(1);
    const perPage = 20;

    const keys = useMemo(() => Object.keys(baseTranslations || {}), [baseTranslations]);
    const totalPages = Math.max(1, Math.ceil(keys.length / perPage));
    const pageKeys = keys.slice((page - 1) * perPage, page * perPage);

    const updateTranslation = (key, value) => {
        setTranslationsObj(prev => ({ ...prev, [key]: value }));
    };

    const submit = (e) => {
        e.preventDefault();
        setData('translations', JSON.stringify(translationsObj));
        post(route('admin.languages.update', language.id), {
            _method: 'put',
        });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">{t('Edit Language')}</h2>}>
            <Head title={t('Edit Language')} />
            <div className="py-8">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <form onSubmit={submit} className="space-y-4 bg-white p-4 shadow sm:rounded-lg">
                        <div>
                            <InputLabel htmlFor="name" value={t('Language Name')} />
                            <TextInput id="name" value={data.name} className="mt-1 block w-full" onChange={e => setData('name', e.target.value)} required />
                            <InputError message={errors.name} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="code" value={t('Language Code')} />
                            <TextInput id="code" value={data.code} className="mt-1 block w-full" onChange={e => setData('code', e.target.value)} required />
                            <InputError message={errors.code} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="direction" value={t('Direction')} />
                            <select id="direction" value={data.direction} onChange={e => setData('direction', e.target.value)} className="mt-1 block w-full rounded border-gray-300">
                                <option value="ltr">{t('LTR')}</option>
                                <option value="rtl">{t('RTL')}</option>
                            </select>
                            <InputError message={errors.direction} className="mt-2" />
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700">{t('English')}</th>
                                        <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700">{t('Translation')}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {pageKeys.map((k) => (
                                        <tr key={k}>
                                            <td className="px-3 py-2 text-sm text-gray-900">{k}</td>
                                            <td className="px-3 py-2">
                                                <TextInput value={translationsObj[k] || ''} className="mt-1 block w-full" onChange={e => updateTranslation(k, e.target.value)} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <InputError message={errors.translations} className="mt-2" />
                            <div className="flex justify-between items-center mt-4">
                                <button type="button" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 rounded border disabled:opacity-50">
                                    {t('Prev')}
                                </button>
                                <span className="text-sm">{page} / {totalPages}</span>
                                <button type="button" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1 rounded border disabled:opacity-50">
                                    {t('Next')}
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <Link href={route('admin.languages.index')} className="text-gray-600 hover:underline">{t('Cancel')}</Link>
                            <PrimaryButton disabled={processing}>{t('Save')}</PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, useForm, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function Edit({ language }) {
    const { t } = useTranslation();
    const { data, setData, put, processing, errors } = useForm({
        name: language.name || '',
        code: language.code || '',
        direction: language.direction || 'ltr',
        translations: JSON.stringify(language.translations || {}, null, 2),
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.languages.update', language.id));
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
                        <div>
                            <InputLabel htmlFor="translations" value={t('Translations (JSON)')} />
                            <textarea id="translations" rows="10" className="mt-1 block w-full rounded border-gray-300" value={data.translations} onChange={e => setData('translations', e.target.value)} />
                            <InputError message={errors.translations} className="mt-2" />
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

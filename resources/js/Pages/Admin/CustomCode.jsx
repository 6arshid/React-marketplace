import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function CustomCode({ custom_css, custom_js }) {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors } = useForm({
        custom_css: custom_css || '',
        custom_js: custom_js || '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.custom-code.update'));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">{t('Custom Code')}</h2>}>
            <Head title={t('Custom Code')} />
            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <form onSubmit={submit} className="space-y-4 bg-white p-4 shadow sm:rounded-lg">
                        <div>
                            <InputLabel htmlFor="custom_css" value={t('Custom CSS')} />
                            <textarea
                                id="custom_css"
                                rows="6"
                                className="mt-1 block w-full rounded-md border-gray-300"
                                value={data.custom_css}
                                onChange={(e) => setData('custom_css', e.target.value)}
                            />
                            <InputError message={errors.custom_css} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="custom_js" value={t('Custom JS')} />
                            <textarea
                                id="custom_js"
                                rows="6"
                                className="mt-1 block w-full rounded-md border-gray-300"
                                value={data.custom_js}
                                onChange={(e) => setData('custom_js', e.target.value)}
                            />
                            <InputError message={errors.custom_js} className="mt-2" />
                        </div>
                        <div className="flex justify-end">
                            <PrimaryButton disabled={processing}>{t('Save')}</PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

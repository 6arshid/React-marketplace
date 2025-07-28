import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function Edit({ coupon }) {
    const { t } = useTranslation();
    const { data, setData, put, processing, errors } = useForm({
        title: coupon.title,
        code: coupon.code,
        percent: coupon.percent,
        expires_at: coupon.expires_at ? coupon.expires_at.substring(0, 10) : '',
    });

    const submit = e => {
        e.preventDefault();
        put(route('coupons.update', coupon.id));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">{t('Edit Code')}</h2>}>
            <Head title={t('Edit Code')} />
            <div className="py-8">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <form onSubmit={submit} className="bg-white shadow rounded-lg p-6 space-y-4">
                        <div>
                            <InputLabel htmlFor="title" value={t('Title')} />
                            <TextInput id="title" value={data.title} onChange={e => setData('title', e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.title} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="code" value={t('Code')} />
                            <TextInput id="code" value={data.code} onChange={e => setData('code', e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.code} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="percent" value={t('Percent')} />
                            <TextInput id="percent" type="number" value={data.percent} onChange={e => setData('percent', e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.percent} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="expires_at" value={t('Expires at')} />
                            <TextInput id="expires_at" type="date" value={data.expires_at} onChange={e => setData('expires_at', e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.expires_at} className="mt-2" />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <PrimaryButton>{t('Save')}</PrimaryButton>
                            <PrimaryButton as={Link} href={route('coupons.index')} className="bg-gray-200 text-gray-700 hover:bg-gray-300">{t('Cancel')}</PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

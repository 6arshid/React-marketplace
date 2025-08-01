import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function Edit({ voucher }) {
    const { t } = useTranslation();
    const { data, setData, put, processing, errors } = useForm({
        public_code: voucher.public_code,
        secret_pin: '',
        initial_amount: voucher.initial_amount,
        expires_at: voucher.expires_at ? voucher.expires_at.substring(0,10) : '',
        min_cart_amount: voucher.constraints?.min_cart_amount || '',
        status: voucher.status,
    });

    const submit = e => {
        e.preventDefault();
        put(route('vouchers.update', voucher.id));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">{t('Edit Voucher')}</h2>}>
            <Head title={t('Edit Voucher')} />
            <div className="py-8">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <form onSubmit={submit} className="bg-white shadow rounded-lg p-6 space-y-4">
                        <div>
                            <InputLabel htmlFor="public_code" value={t('Code')} />
                            <TextInput id="public_code" value={data.public_code} onChange={e => setData('public_code', e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.public_code} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="secret_pin" value={t('PIN')} />
                            <TextInput id="secret_pin" value={data.secret_pin} onChange={e => setData('secret_pin', e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.secret_pin} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="initial_amount" value={t('Amount')} />
                            <TextInput id="initial_amount" type="number" value={data.initial_amount} onChange={e => setData('initial_amount', e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.initial_amount} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="min_cart_amount" value={t('Min Cart Amount')} />
                            <TextInput id="min_cart_amount" type="number" value={data.min_cart_amount} onChange={e => setData('min_cart_amount', e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.min_cart_amount} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="expires_at" value={t('Expires at')} />
                            <TextInput id="expires_at" type="date" value={data.expires_at} onChange={e => setData('expires_at', e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.expires_at} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="status" value={t('Status')} />
                            <TextInput id="status" value={data.status} onChange={e => setData('status', e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.status} className="mt-2" />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <PrimaryButton>{t('Save')}</PrimaryButton>
                            <PrimaryButton as={Link} href={route('vouchers.index')} className="bg-gray-200 text-gray-700 hover:bg-gray-300">{t('Cancel')}</PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import GuestLayout from '@/Layouts/GuestLayout';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function AccountType() {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors } = useForm({
        is_seller: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('account-type.store'));
    };

    return (
        <GuestLayout>
            <Head title={t('Account Type')} />
            <form onSubmit={submit}>
                <div>
                    <InputLabel value={t('Select Account Type')} />
                    <div className="flex items-center mt-2 space-x-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="is_seller"
                                value="0"
                                checked={!data.is_seller}
                                onChange={() => setData('is_seller', false)}
                                className="mr-2"
                            />
                            {t('Buyer')}
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="is_seller"
                                value="1"
                                checked={data.is_seller}
                                onChange={() => setData('is_seller', true)}
                                className="mr-2"
                            />
                            {t('Seller')}
                        </label>
                    </div>
                    <InputError message={errors.is_seller} className="mt-2" />
                </div>
                <div className="mt-4 flex justify-end">
                    <PrimaryButton disabled={processing}>{t('Continue')}</PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}

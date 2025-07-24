import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

export default function ContactInfoForm({ className = '' }) {
    const user = usePage().props.auth.user;
    const stripe = usePage().props.stripe;
    const { t } = useTranslation();

    const isPro = user.pro_panel;
    const showStripeFields = !user.is_admin;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            trc20_usdt_wallet: user.trc20_usdt_wallet || '',
            bitcoin_wallet: user.bitcoin_wallet || '',
            public_email: user.public_email || '',
            whatsapp_number: user.whatsapp_number || '',
            telegram_username: user.telegram_username || '',
            stripe_api_key: showStripeFields ? user.stripe_api_key || '' : '',
            stripe_secret_key: showStripeFields ? user.stripe_secret_key || '' : '',
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.contact.update'), { preserveScroll: true });
    };

    const upgrade = async () => {
        const res = await axios.post(route('subscription.checkout'));
        window.location.href = res.data.url;
    };

    const cancelSubscription = async () => {
        await axios.post(route('subscription.cancel'));
        window.location.reload();
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">{t('Bank details and contact information')}</h2>
                <p className="mt-1 text-sm text-gray-600">{t('Update your public contact details and payment wallets.')}</p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">

                <div>
                    <InputLabel htmlFor="public_email" value={t('Public Email')} />
                    <TextInput
                        id="public_email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.public_email}
                        onChange={(e) => setData('public_email', e.target.value)}
                        disabled={!isPro}
                        autoComplete="off"
                    />
                    <InputError message={errors.public_email} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="whatsapp_number" value={t('WhatsApp Number')} />
                    <TextInput
                        id="whatsapp_number"
                        className="mt-1 block w-full"
                        value={data.whatsapp_number}
                        onChange={(e) => setData('whatsapp_number', e.target.value)}
                        autoComplete="off"
                    />
                    <InputError message={errors.whatsapp_number} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="telegram_username" value={t('Telegram Username')} />
                    <TextInput
                        id="telegram_username"
                        className="mt-1 block w-full"
                        value={data.telegram_username}
                        onChange={(e) => setData('telegram_username', e.target.value)}
                        autoComplete="off"
                    />
                    <InputError message={errors.telegram_username} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="trc20_usdt_wallet" value={t('USDT Wallet')} />
                    <TextInput
                        id="trc20_usdt_wallet"
                        className="mt-1 block w-full"
                        value={data.trc20_usdt_wallet}
                        onChange={(e) => setData('trc20_usdt_wallet', e.target.value)}
                        disabled={!isPro}
                        autoComplete="off"
                    />
                    <InputError message={errors.trc20_usdt_wallet} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="bitcoin_wallet" value={t('Bitcoin Wallet')} />
                    <TextInput
                        id="bitcoin_wallet"
                        className="mt-1 block w-full"
                        value={data.bitcoin_wallet}
                        onChange={(e) => setData('bitcoin_wallet', e.target.value)}
                        disabled={!isPro}
                        autoComplete="off"
                    />
                    <InputError message={errors.bitcoin_wallet} className="mt-2" />
                </div>

                {showStripeFields && (
                    <>
                        <div>
                            <InputLabel htmlFor="stripe_api_key" value={t('Stripe API Key')} />
                            <TextInput
                                id="stripe_api_key"
                                className="mt-1 block w-full"
                                value={data.stripe_api_key}
                                onChange={(e) => setData('stripe_api_key', e.target.value)}
                                autoComplete="off"
                            />
                            <InputError message={errors.stripe_api_key} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="stripe_secret_key" value={t('Stripe Secret Key')} />
                            <TextInput
                                id="stripe_secret_key"
                                className="mt-1 block w-full"
                                value={data.stripe_secret_key}
                                onChange={(e) => setData('stripe_secret_key', e.target.value)}
                                autoComplete="off"
                            />
                            <InputError message={errors.stripe_secret_key} className="mt-2" />
                        </div>
                    </>
                )}

                <div className="flex items-center gap-4">
                    {isPro ? (
                        <>
                            <PrimaryButton disabled={processing}>{t('Save')}</PrimaryButton>
                            <button type="button" onClick={cancelSubscription} className="ml-2 text-red-600 hover:underline">
                                {t('Cancel Plan')}
                            </button>
                        </>
                    ) : (
                        <PrimaryButton type="button" onClick={upgrade} disabled={processing}>
                            {t('Upgrade to Pro ({{price}} monthly)', { price: stripe.price })}
                        </PrimaryButton>
                    )}
                    {isPro && (
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600">{t('Saved.')}</p>
                        </Transition>
                    )}
                </div>
            </form>
        </section>
    );
}

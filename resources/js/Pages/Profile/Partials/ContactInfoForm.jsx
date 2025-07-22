import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import axios from 'axios';

export default function ContactInfoForm({ className = '' }) {
    const user = usePage().props.auth.user;
    const stripe = usePage().props.stripe;

    const isPro = user.pro_panel;
    const showStripeFields = isPro && !user.is_admin;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            whatsapp_number: user.whatsapp_number || '',
            telegram_username: user.telegram_username || '',
            public_email: user.public_email || '',
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
                <h2 className="text-lg font-medium text-gray-900">Contact Information</h2>
                <p className="mt-1 text-sm text-gray-600">Update your public contact details.</p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="whatsapp_number" value="WhatsApp Number" />
                    <TextInput
                        id="whatsapp_number"
                        className="mt-1 block w-full"
                        value={data.whatsapp_number}
                        onChange={(e) => setData('whatsapp_number', e.target.value)}
                        disabled={!isPro}
                        autoComplete="off"
                    />
                    <InputError message={errors.whatsapp_number} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="telegram_username" value="Telegram Username" />
                    <TextInput
                        id="telegram_username"
                        className="mt-1 block w-full"
                        value={data.telegram_username}
                        onChange={(e) => setData('telegram_username', e.target.value)}
                        disabled={!isPro}
                        autoComplete="off"
                    />
                    <InputError message={errors.telegram_username} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="public_email" value="Public Email" />
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

                {showStripeFields && (
                    <>
                        <div>
                            <InputLabel htmlFor="stripe_api_key" value="Stripe API Key" />
                            <TextInput
                                id="stripe_api_key"
                                className="mt-1 block w-full"
                                value={data.stripe_api_key}
                                onChange={(e) => setData('stripe_api_key', e.target.value)}
                                disabled={!isPro}
                                autoComplete="off"
                            />
                            <InputError message={errors.stripe_api_key} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="stripe_secret_key" value="Stripe Secret Key" />
                            <TextInput
                                id="stripe_secret_key"
                                className="mt-1 block w-full"
                                value={data.stripe_secret_key}
                                onChange={(e) => setData('stripe_secret_key', e.target.value)}
                                disabled={!isPro}
                                autoComplete="off"
                            />
                            <InputError message={errors.stripe_secret_key} className="mt-2" />
                        </div>
                    </>
                )}

                <div className="flex items-center gap-4">
                    {isPro ? (
                        <>
                            <PrimaryButton disabled={processing}>Save</PrimaryButton>
                            <button type="button" onClick={cancelSubscription} className="ml-2 text-red-600 hover:underline">
                                Cancel Plan
                            </button>
                        </>
                    ) : (
                        <PrimaryButton type="button" onClick={upgrade} disabled={processing}>
                            Upgrade to Pro (${stripe.price} mahane)
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
                            <p className="text-sm text-gray-600">Saved.</p>
                        </Transition>
                    )}
                </div>
            </form>
        </section>
    );
}

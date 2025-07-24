import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function ParkDomainForm({ ns1, ns2, className = '' }) {
    const user = usePage().props.auth.user;
    const { t } = useTranslation();

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            domain: '',
        });

    const disabled = !user.pro_panel;

    const submit = (e) => {
        e.preventDefault();
        if (disabled) return;
        post(route('domains.store'), { preserveScroll: true });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">{t('Park Domain')}</h2>
                <p className="mt-1 text-sm text-gray-600">
                    {t('Point your domain to {{ns1}} and {{ns2}}.', { ns1, ns2 })}
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="domain" value={t('Domain')} />
                    <TextInput
                        id="domain"
                        className="mt-1 block w-full"
                        value={data.domain}
                        onChange={(e) => setData('domain', e.target.value)}
                        disabled={disabled}
                        autoComplete="off"
                    />
                    <InputError message={errors.domain} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing || disabled}>{t('Save')}</PrimaryButton>
                    {disabled && (
                        <p className="text-sm text-gray-500">{t('Pro account required')}</p>
                    )}
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">{t('Saved.')}</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}

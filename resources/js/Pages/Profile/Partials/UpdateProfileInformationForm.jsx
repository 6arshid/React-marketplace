import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const { t } = useTranslation();
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            username: user.username,
            name: user.name,
            email: user.email,
        });

    const [usernameStatus, setUsernameStatus] = useState(null);

    useEffect(() => {
        if (data.username === user.username) {
            setUsernameStatus('self');
        } else if (data.username && data.username.length >= 4) {
            setUsernameStatus('checking');
            fetch(route('username.check', { username: data.username }))
                .then((res) => res.json())
                .then((res) => {
                    setUsernameStatus(res.available ? 'available' : 'taken');
                })
                .catch(() => setUsernameStatus(null));
        } else {
            setUsernameStatus(null);
        }
    }, [data.username, user.username]);

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    {t('Profile Information')}
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    {t("Update your account profile information and email address.")}
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="username" value={t('Username')} />

                    <TextInput
                        id="username"
                        className="mt-1 block w-full"
                        value={data.username}
                        onChange={(e) => setData('username', e.target.value)}
                        required
                        autoComplete="off"
                    />

                    {usernameStatus === 'checking' && (
                        <p className="mt-2 text-sm text-gray-500">{t('Checking...')}</p>
                    )}
                    {usernameStatus === 'available' && (
                        <p className="mt-2 text-sm text-green-600">{t('Username available')}</p>
                    )}
                    {usernameStatus === 'taken' && (
                        <p className="mt-2 text-sm text-red-600">{t('Username already taken')}</p>
                    )}
                    {usernameStatus === 'self' && (
                        <p className="mt-2 text-sm text-green-600">{t('You own this username')}</p>
                    )}

                    <InputError className="mt-2" message={errors.username} />
                </div>

                <div>
                    <InputLabel htmlFor="name" value={t('Name')} />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value={t('Email')} />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            {t('Your email address is unverified.')}
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                {t('Click here to re-send the verification email.')}
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                {t('A new verification link has been sent to your email address.')}
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>{t('Save')}</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            {t('Saved.')}
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import GoogleIcon from '@/Components/GoogleIcon';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        name: '',
        email: '',
        is_seller: false,
        password: '',
        password_confirmation: '',
    });

    const [usernameStatus, setUsernameStatus] = useState(null);

    useEffect(() => {
        if (data.username && data.username.length >= 5) {
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
    }, [data.username]);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="username" value="Username" />

                    <TextInput
                        id="username"
                        name="username"
                        value={data.username}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('username', e.target.value)}
                        required
                    />

                    {usernameStatus === 'checking' && (
                        <p className="mt-2 text-sm text-gray-500">Checking...</p>
                    )}
                    {usernameStatus === 'available' && (
                        <p className="mt-2 text-sm text-green-600">Username available</p>
                    )}
                    {usernameStatus === 'taken' && (
                        <p className="mt-2 text-sm text-red-600">Username already taken</p>
                    )}

                    <InputError message={errors.username} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel value="Account Type" />
                    <div className="flex items-center mt-1 space-x-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="is_seller"
                                value="0"
                                checked={!data.is_seller}
                                onChange={() => setData('is_seller', false)}
                                className="mr-2"
                            />
                            Buyer
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
                            Seller
                        </label>
                    </div>
                    <InputError message={errors.is_seller} className="mt-2" />
                </div>


                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>

            <div className="mt-6 flex justify-center">
                <a
                    href={route('login.google')}
                    className="inline-flex items-center px-4 py-2 border rounded-md bg-white text-gray-700 shadow-sm hover:bg-gray-50"
                >
                    <GoogleIcon className="h-5 w-5 mr-2" />
                    <span>Continue with Google</span>
                </a>
            </div>
        </GuestLayout>
    );
}

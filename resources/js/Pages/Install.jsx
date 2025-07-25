import GuestLayout from '@/Layouts/GuestLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import { Head, useForm } from '@inertiajs/react';

export default function Install() {
    const { data, setData, post, processing, errors } = useForm({
        host: '',
        database: '',
        username: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('install.store'));
    };

    return (
        <GuestLayout>
            <Head title="Install" />
            <form onSubmit={submit} className="max-w-md mx-auto mt-6">
                <div>
                    <InputLabel htmlFor="host" value="Database Host" />
                    <TextInput id="host" className="mt-1 block w-full" value={data.host} onChange={e => setData('host', e.target.value)} required />
                    <InputError message={errors.host} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="database" value="Database Name" />
                    <TextInput id="database" className="mt-1 block w-full" value={data.database} onChange={e => setData('database', e.target.value)} required />
                    <InputError message={errors.database} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="username" value="Database Username" />
                    <TextInput id="username" className="mt-1 block w-full" value={data.username} onChange={e => setData('username', e.target.value)} required />
                    <InputError message={errors.username} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Database Password" />
                    <TextInput id="password" type="password" className="mt-1 block w-full" value={data.password} onChange={e => setData('password', e.target.value)} />
                    <InputError message={errors.password} className="mt-2" />
                </div>
                <div className="mt-6">
                    <PrimaryButton className="w-full" disabled={processing}>Install</PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}

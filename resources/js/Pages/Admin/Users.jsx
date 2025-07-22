import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, useForm } from '@inertiajs/react';

export default function Users({ users }) {
    const { data, setData, put, processing } = useForm({});

    const submit = (id) => {
        put(route('admin.users.update', id), {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Users</h2>}>
            <Head title="Users" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-4">
                    {users.map((u) => (
                        <form key={u.id} onSubmit={(e) => { e.preventDefault(); submit(u.id); }} className="bg-white p-4 shadow sm:rounded-lg space-y-2">
                            <div className="font-semibold">{u.name} ({u.email})</div>
                            <div>
                                <InputLabel htmlFor={`api_${u.id}`} value="Stripe API Key" />
                                <TextInput id={`api_${u.id}`} className="mt-1 block w-full" defaultValue={u.stripe_api_key || ''} onChange={(e) => setData(`stripe_api_key`, e.target.value)} />
                            </div>
                            <div>
                                <InputLabel htmlFor={`secret_${u.id}`} value="Stripe Secret Key" />
                                <TextInput id={`secret_${u.id}`} className="mt-1 block w-full" defaultValue={u.stripe_secret_key || ''} onChange={(e) => setData(`stripe_secret_key`, e.target.value)} />
                            </div>
                            <label className="flex items-center">
                                <Checkbox name="pro_panel" defaultChecked={u.pro_panel} onChange={(e) => setData('pro_panel', e.target.checked)} />
                                <span className="ms-2 text-sm text-gray-600">Pro Panel</span>
                            </label>
                            <div>
                                <InputLabel htmlFor={`expires_${u.id}`} value="Expires At" />
                                <TextInput id={`expires_${u.id}`} type="datetime-local" className="mt-1 block w-full" defaultValue={u.pro_panel_expires_at || ''} onChange={(e) => setData('pro_panel_expires_at', e.target.value)} />
                            </div>
                            <PrimaryButton disabled={processing}>Save</PrimaryButton>
                        </form>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

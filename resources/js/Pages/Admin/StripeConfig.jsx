import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, useForm } from '@inertiajs/react';

export default function StripeConfig({ config }) {
    const { data, setData, post, processing, errors } = useForm({
        api_key: config?.api_key || '',
        secret_key: config?.secret_key || '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.stripe.update'));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Stripe Config</h2>}>
            <Head title="Stripe Config" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg">
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <InputLabel htmlFor="api_key" value="API Key" />
                                <TextInput
                                    id="api_key"
                                    className="mt-1 block w-full"
                                    value={data.api_key}
                                    onChange={(e) => setData('api_key', e.target.value)}
                                />
                                <InputError message={errors.api_key} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="secret_key" value="Secret Key" />
                                <TextInput
                                    id="secret_key"
                                    className="mt-1 block w-full"
                                    value={data.secret_key}
                                    onChange={(e) => setData('secret_key', e.target.value)}
                                />
                                <InputError message={errors.secret_key} className="mt-2" />
                            </div>
                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing}>Save</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

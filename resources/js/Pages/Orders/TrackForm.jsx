import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';

export default function TrackForm() {
    const { data, setData, get, processing, errors } = useForm({
        code: '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (!data.code) return;
        get(route('orders.track', data.code));
    };

    return (
        <GuestLayout>
            <Head title="Track Order" />
            <div className="flex min-h-screen items-center justify-center p-6 bg-gray-100">
                <form onSubmit={submit} className="w-full max-w-md space-y-4 bg-white p-6 shadow sm:rounded-lg">
                    <div>
                        <InputLabel htmlFor="code" value="Tracking Code" />
                        <TextInput
                            id="code"
                            className="mt-1 block w-full"
                            value={data.code}
                            isFocused
                            onChange={(e) => setData('code', e.target.value)}
                        />
                        <InputError message={errors.code} className="mt-2" />
                    </div>
                    <div className="flex justify-end">
                        <PrimaryButton disabled={processing}>Track</PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}

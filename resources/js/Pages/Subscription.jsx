import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, useForm } from '@inertiajs/react';

export default function Subscription({ price, user }) {
    const { post, processing } = useForm();

    const subscribe = () => {
        post(route('subscription.subscribe'));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Subscription</h2>}>
            <Head title="Subscription" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-4">
                    <div className="bg-white p-4 shadow sm:rounded-lg space-y-2">
                        <p>Monthly Price: ${price}</p>
                        <p>Current status: {user.pro_panel ? 'Active' : 'Inactive'}</p>
                        <PrimaryButton onClick={subscribe} disabled={processing}>Subscribe</PrimaryButton>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

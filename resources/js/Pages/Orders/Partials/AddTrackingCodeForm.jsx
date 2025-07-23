import { useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function AddTrackingCodeForm({ order }) {
    const { data, setData, patch, processing, errors } = useForm({
        status: order.status || 'preparing',
        postal_tracking_code: '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (!data.postal_tracking_code) return;
        patch(route('orders.update', order.id), { preserveScroll: true });
    };

    return (
        <form onSubmit={submit} className="flex items-center space-x-2">
            <TextInput
                value={data.postal_tracking_code}
                onChange={(e) => setData('postal_tracking_code', e.target.value)}
                className="block w-full text-xs px-2 py-1"
                placeholder="Tracking code"
            />
            <PrimaryButton
                disabled={processing || !data.postal_tracking_code}
                className="px-2 py-1 text-xs"
            >
                Save
            </PrimaryButton>
            {errors.postal_tracking_code && (
                <span className="text-xs text-red-600">{errors.postal_tracking_code}</span>
            )}
        </form>
    );
}

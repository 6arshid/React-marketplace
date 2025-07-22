import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';

export default function UpdateStatusForm({ order }) {
    const { data, setData, patch, processing, errors } = useForm({
        status: order.status || 'preparing',
        postal_tracking_code: order.postal_tracking_code || '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('orders.update', order.id), { preserveScroll: true });
    };

    return (
        <form onSubmit={submit} className="space-y-1">
            <div>
                <InputLabel htmlFor={`status_${order.id}`} value="Status" />
                <select
                    id={`status_${order.id}`}
                    value={data.status}
                    onChange={(e) => setData('status', e.target.value)}
                    className="mt-1 block w-full"
                >
                    <option value="preparing">Preparing</option>
                    <option value="posted">Shipped to Post</option>
                </select>
            </div>
            <div>
                <InputLabel htmlFor={`postal_${order.id}`} value="Postal Tracking Code" />
                <TextInput
                    id={`postal_${order.id}`}
                    value={data.postal_tracking_code}
                    onChange={(e) => setData('postal_tracking_code', e.target.value)}
                    className="mt-1 block w-full"
                />
            </div>
            <InputError message={errors.status || errors.postal_tracking_code} className="mt-1" />
            <div>
                <PrimaryButton disabled={processing}>Save</PrimaryButton>
            </div>
        </form>
    );
}

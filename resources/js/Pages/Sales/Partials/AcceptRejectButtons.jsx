import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import { useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function AcceptRejectButtons({ order }) {
    const { t } = useTranslation();
    const { data, setData, patch, processing } = useForm({ status: order.status });

    const accept = () => {
        setData('status', 'accepted');
        patch(route('orders.update', order.id), { preserveScroll: true });
    };

    const reject = () => {
        setData('status', 'rejected');
        patch(route('orders.update', order.id), { preserveScroll: true });
    };

    return (
        <div className="flex space-x-2">
            <PrimaryButton type="button" onClick={accept} disabled={processing} className="px-2 py-1 text-xs">
                {t('Accept')}
            </PrimaryButton>
            <DangerButton type="button" onClick={reject} disabled={processing} className="px-2 py-1 text-xs">
                {t('Reject')}
            </DangerButton>
        </div>
    );
}

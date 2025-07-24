import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import { useTranslation } from 'react-i18next';

export default function AddToCartPrompt({ show, onClose, onGoToCart }) {
    const { t } = useTranslation();

    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">{t('Item added to cart')}</h2>
                <p className="mt-1 text-sm text-gray-600">{t('Would you like to continue shopping or go to your cart?')}</p>
                <div className="mt-6 flex justify-end gap-2">
                    <SecondaryButton onClick={onClose}>{t('Continue Shopping')}</SecondaryButton>
                    <PrimaryButton type="button" onClick={onGoToCart}>{t('Go to Cart')}</PrimaryButton>
                </div>
            </div>
        </Modal>
    );
}

import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import Modal from '@/Components/Modal';
import i18n from '@/i18n';

const flagIcons = {
    en: (
        <svg className="w-5 h-5" viewBox="0 0 640 480">
            <rect width="640" height="480" fill="#b22234" />
            <path fill="#fff" d="M0 55h640v55H0zM0 165h640v55H0zM0 275h640v55H0zM0 385h640v55H0z" />
            <rect width="296" height="220" fill="#3c3b6e" />
        </svg>
    ),
    fa: (
        <svg className="w-5 h-5" viewBox="0 0 640 480">
            <rect width="640" height="160" fill="#239f40" />
            <rect y="160" width="640" height="160" fill="#fff" />
            <rect y="320" width="640" height="160" fill="#da0000" />
        </svg>
    ),
};

export default function LanguageDropdown({ className = '' }) {
    const { t } = useTranslation();
    const languages = usePage().props.languages || [];
    const [open, setOpen] = useState(false);

    const changeLanguage = (code) => {
        i18n.changeLanguage(code);
        setOpen(false);
    };

    const current = i18n.language;

    return (
        <div className={className}>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="p-2 rounded hover:bg-gray-100 text-gray-600 flex items-center"
            >
                {flagIcons[current] || (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM3 12c0-1.3.3-2.5.8-3.6L9 12v6.9A8 8 0 013 12zm9 8a8 8 0 01-2-.3v-7l6.2 6.2A8 8 0 0112 20zm3-1.4l-6-6V4.3a8 8 0 016 14.3z" />
                    </svg>
                )}
            </button>
            <Modal show={open} onClose={() => setOpen(false)}>
                <div className="p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">{t('Languages')}</h3>
                    <div className="space-y-2">
                        {languages.map((l) => (
                            <button
                                key={l.code}
                                type="button"
                                onClick={() => changeLanguage(l.code)}
                                className="flex items-center px-3 py-2 hover:bg-gray-100 w-full text-sm rounded"
                            >
                                {flagIcons[l.code] || (
                                    <span className="w-5 h-5 flex items-center justify-center font-bold uppercase">
                                        {l.code}
                                    </span>
                                )}
                                <span className="ml-2">{l.name}</span>
                            </button>
                        ))}
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="px-4 py-2 bg-gray-100 rounded"
                        >
                            {t('Cancel')}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

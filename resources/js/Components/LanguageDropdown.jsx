import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import Modal from '@/Components/Modal';
import i18n from '@/i18n';

const flagIcons = {
    fa: (
        <svg className="w-5 h-5" viewBox="0 0 640 480">
            <rect width="640" height="160" fill="#239f40" />
            <rect y="160" width="640" height="160" fill="#fff" />
            <rect y="320" width="640" height="160" fill="#da0000" />
        </svg>
    ),
};

const translateIcon = (
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-translate" viewBox="0 0 16 16">
  <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286zm1.634-.736L5.5 3.956h-.049l-.679 2.022z"/>
  <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm7.138 9.995q.289.451.63.846c-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6 6 0 0 1-.415-.492 2 2 0 0 1-.94.31"/>
</svg>
);

export default function LanguageDropdown({ className = '' }) {
    const { t } = useTranslation();
    const languages = usePage().props.languages || [];
    const [open, setOpen] = useState(false);

    const getFlag = (code) => {
        const lang = languages.find((l) => l.code === code);
        if (lang && lang.flag) {
            return (
                <img
                    src={`/storage/${lang.flag}`}
                    alt={code}
                    className="w-5 h-5 object-cover rounded"
                />
            );
        }
        return flagIcons[code];
    };

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
                {getFlag(current) || translateIcon}
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
                                {getFlag(l.code) || (
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

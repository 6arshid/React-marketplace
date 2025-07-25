import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export function initI18n(languages = [], lng = 'en') {
    const resources = {};
    languages.forEach((lang) => {
        if (lang.translations) {
            resources[lang.code] = { translation: lang.translations };
        }
    });

    return i18n.use(initReactI18next).init({
        resources,
        lng,
        fallbackLng: 'en',
        interpolation: { escapeValue: false },
    });
}

export default i18n;

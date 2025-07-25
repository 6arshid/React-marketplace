import '../css/app.css';
import './bootstrap';
import i18n, { initI18n } from './i18n';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    async setup({ el, App, props }) {
        const root = createRoot(el);

        const languages = props.initialPage.props.languages || [];
        const locale = props.initialPage.props.locale || 'en';
        await initI18n(languages, locale);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});


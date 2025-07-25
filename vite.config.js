import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: process.env.VITE_PWA_NAME || 'React Marketplace',
                short_name: process.env.VITE_PWA_SHORT_NAME || 'Marketplace',
                description: process.env.VITE_PWA_DESCRIPTION || '',
                theme_color: process.env.VITE_PWA_THEME_COLOR || '#ffffff',
                background_color: process.env.VITE_PWA_BACKGROUND_COLOR || '#ffffff',
                icons: process.env.VITE_PWA_ICON
                    ? [
                          {
                              src: `/storage/${process.env.VITE_PWA_ICON}`,
                              sizes: '512x512',
                              type: 'image/png',
                              purpose: 'any maskable',
                          },
                      ]
                    : [],
            },
        }),
    ],
});

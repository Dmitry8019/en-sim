import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
    // plugins: [react(), svgr(), VitePWA({ registerType: 'autoUpdate' })],
    plugins: [
        react(),
        svgr(),
        VitePWA({
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true,
            },
            manifest: {
                name: 'English Simulator',
                short_name: 'ES',
                description: 'English Simulator 2025',
                theme_color: '#383838',
                icons: [
                    {
                        src: 'public/logo.svg',
                        sizes: '32x32',
                        type: 'image/png',
                    },
                ],
            },
        }),
    ],
    define: {
        // __API__: JSON.stringify('http://localhost:8000'),
        __API__: JSON.stringify('https://english-sumulator-server.vercel.app'),
    },
});

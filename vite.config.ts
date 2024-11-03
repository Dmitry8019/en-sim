import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
    define: {
        // __API__: JSON.stringify('http://localhost:8000'),
        __API__: JSON.stringify('https://english-sumulator-server.vercel.app'),
    },
});

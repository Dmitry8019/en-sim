import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { routeConfig } from './router/config/routeConfig.tsx';
import { StoreProvider } from './store/StoreContext.tsx';

import './index.css';

export const queryClient = new QueryClient();

const router = createBrowserRouter(routeConfig);

createRoot(document.getElementById('root')!).render(
    // <StrictMode>
    <QueryClientProvider client={queryClient}>
        <StoreProvider>
            <RouterProvider router={router} />
        </StoreProvider>
    </QueryClientProvider>,
    // </StrictMode>,
);

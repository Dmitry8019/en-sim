import { memo, Suspense, useCallback } from 'react';
import { Route, RouteProps, Routes } from 'react-router-dom';

import { Loader } from '../../components/Loader/Loader';
import { routeConfig } from '../config/routeConfig';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
};

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = <Suspense fallback={<Loader />}>{route.element}</Suspense>;

        return <Route key={route.path} path={route.path} element={element} />;
    }, []);

    return (
        <Suspense fallback={<Loader />}>
            <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
        </Suspense>
    );
};

export default memo(AppRouter);

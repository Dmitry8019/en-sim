import { AppRoutesProps } from '../ui/AppRouter';
import { AppRoutes, getRouteAbout, getRouteMain, getRouteTrainer } from '../../const/router';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <div>Home</div>,
    },
    [AppRoutes.ABOUT]: {
        path: getRouteAbout(),
        element: <div>About</div>,
    },
    [AppRoutes.TRAINER]: {
        path: getRouteTrainer(),
        element: <div>Trainer</div>,
        authOnly: true,
    },
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <div>Not Found</div>,
    },
};

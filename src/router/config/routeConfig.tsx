import { AppRoutesProps } from '../ui/AppRouter';
import { AppRoutes, getRouteAbout, getRouteMain, getRouteTrainer } from '../../const/router';
import { TrainerPage } from '../../components/TrainerPage/TrainerPage';

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
        element: <TrainerPage />,
        authOnly: true,
    },
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <div>Not Found</div>,
    },
};

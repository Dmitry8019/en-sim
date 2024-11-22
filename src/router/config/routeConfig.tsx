import App from '../../App';
import { TrainerPage } from '../../components/TrainerPage/TrainerPage';
import { Trainer } from '../../components/Trainer/Trainer';
import { HomePage } from '../../pages/Home/HomePage';
import { AboutPage } from '../../pages/About/AboutPage';
import {
    getRouteAbout,
    getRouteMain,
    getRouteTrainer,
    getRouteTrainerId,
} from '../../const/router';

export const routeConfig = [
    {
        path: getRouteMain(),
        element: <App />,
        children: [
            {
                path: getRouteMain(),
                element: <HomePage />,
            },
            {
                path: getRouteAbout(),
                element: <AboutPage />,
            },
            {
                path: getRouteTrainer(),
                element: <TrainerPage />,
            },
            {
                path: getRouteTrainerId(),
                element: <Trainer />,
            },
        ],
    },
];

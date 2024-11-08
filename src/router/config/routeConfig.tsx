import App from '../../App';
import { TrainerPage } from '../../components/TrainerPage/TrainerPage';
import { Trainer } from '../../components/Trainer/Trainer';
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
                element: <div>Home</div>,
            },
            {
                path: getRouteAbout(),
                element: <div>About</div>,
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

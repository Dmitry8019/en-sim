export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    TRAINER = 'trainer',
    TRAINER_ID = 'trainer_id',
    NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';
export const getRouteTrainer = () => '/trainer';
export const getRouteTrainerId = () => '/trainer/:id';

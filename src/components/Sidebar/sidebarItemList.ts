import { getRouteAbout, getRouteMain, getRouteTrainer } from '../../const/router';
import HomeIcon from '../../assets/icons/home.svg?react';
import InfoIcon from '../../assets/icons/info.svg?react';
import TrainerIcon from '../../assets/icons/trainer.svg?react';

export interface ISidebarItem {
    path: string;
    text: string;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    authOnly?: boolean;
}

export const sidebarItemsList: ISidebarItem[] = [
    {
        path: getRouteMain(),
        text: 'Home',
        Icon: HomeIcon,
    },
    {
        path: getRouteAbout(),
        text: 'About',
        Icon: InfoIcon,
    },
    {
        path: getRouteTrainer(),
        text: 'Trainer',
        Icon: TrainerIcon,
        authOnly: true,
    },
];

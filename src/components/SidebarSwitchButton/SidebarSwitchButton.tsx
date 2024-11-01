import { memo } from 'react';

import { Icon } from '../Icon/Icon';
import { Button, ThemeButton } from '../Button/Button';
import BurgerIcon from '../../assets/icons/menu-burger.svg?react';

import styles from './SidebarSwitchButton.module.scss';

interface SidebarSwitchButtonProps {
    className?: string;
    onToggle: VoidFunction;
}

export const SidebarSwitchButton = memo((props: SidebarSwitchButtonProps) => {
    const { onToggle } = props;

    return (
        <Button theme={ThemeButton.CLEAR} className={styles.burger} onClick={onToggle}>
            <Icon Svg={BurgerIcon} />
        </Button>
    );
});

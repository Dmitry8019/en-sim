import { AppTheme } from '../../types';
import { AppLogo } from '../AppLogo/AppLogo';
import { RightSidebar } from '../RightSidebar/RightSidebar';
import styles from './Navbar.module.scss';

interface NavbarProps {
    theme: AppTheme;
    onTheme: (theme: AppTheme) => void;
}

export const Navbar = (props: NavbarProps) => {
    const { onTheme, theme } = props;

    return (
        <div className={styles.navbar}>
            <AppLogo className={styles.logoPosition} />
            <RightSidebar theme={theme} onTheme={onTheme} />
        </div>
    );
};

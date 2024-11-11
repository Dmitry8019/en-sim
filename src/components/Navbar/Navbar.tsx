import { AppLogo } from '../AppLogo/AppLogo';
import { RightSidebar } from '../RightSidebar/RightSidebar';
import styles from './Navbar.module.scss';

export const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <AppLogo className={styles.logoPosition} />
            <RightSidebar />
        </div>
    );
};

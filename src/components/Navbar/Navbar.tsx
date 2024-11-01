import { AppLogo } from '../AppLogo/AppLogo';
import styles from './Navbar.module.scss';

export const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <AppLogo className={styles.logoPosition} />
            <div className={styles.wrapper}>text</div>
        </div>
    );
};

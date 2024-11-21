import { Icon } from '../../components/Icon/Icon';
import { Page } from '../../components/Page/Page';
import HomeIcon from '../../assets/icons/homeIcon.svg?react';

import styles from './HomePage.module.scss';

export const HomePage = () => {
    return (
        <Page className={styles.homePage}>
            <p>Welcome to the</p>
            <p>English</p>
            <p>Simulator!</p>
            <div className={styles.image}>
                <Icon Svg={HomeIcon} />
            </div>

            <p>Improve your English skills with our interactive exercises.</p>
            <div className={styles.largeText}>ES</div>

            <footer>© 2025 English Simulator. All rights reserved.</footer>
        </Page>
    );
};

import { Page } from '../../components/Page/Page';

import styles from './HomePage.module.scss';

export const HomePage = () => {
    return (
        <Page className={styles.homePage}>
            <p>Welcome to the</p>
            <p>English</p>
            <p>Simulator!</p>

            <img className={styles.image} src='../src/assets/icons/background-es.jpg' alt='' />

            <p>Improve your English skills with our interactive exercises.</p>
            <div className={styles.largeText}>ES</div>

            <footer>© 2025 English Simulator. All rights reserved.</footer>
        </Page>
    );
};

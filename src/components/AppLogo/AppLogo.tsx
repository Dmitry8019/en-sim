import classNames from 'classnames';

import styles from './AppLogo.module.scss';

interface AppNameProps {
    className?: string;
}

export const AppLogo = (props: AppNameProps) => {
    const { className } = props;
    return <div className={classNames(styles.text, {}, [className])}>English Simulator</div>;
};

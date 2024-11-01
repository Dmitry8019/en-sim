import classNames from 'classnames';
import styles from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar = (props: SidebarProps) => {
    const { className } = props;

    return (
        <>
            <div className={classNames(styles.sidebar, className)}>Sidebar</div>
        </>
    );
};

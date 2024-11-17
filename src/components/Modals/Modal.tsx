import classNames from 'classnames';
import styles from './Modal.module.scss';
import { ReactNode } from 'react';

interface ConfirmProps {
    className?: string;
    showConfirm: boolean;
    title: string;
    text?: string;
    children: ReactNode;
}

export const Modal = (props: ConfirmProps) => {
    const { className, showConfirm, title, text = '', children } = props;

    return (
        <div
            className={classNames(styles.confirm, { [styles.showConfirm]: showConfirm }, className)}
        >
            <h3>{title}</h3>
            <div>{text}</div>
            <div className={styles.wrapper}>{children}</div>
        </div>
    );
};

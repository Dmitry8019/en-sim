import classNames from 'classnames';

import styles from './loader.module.scss';

interface LoaderProps {
    className?: string;
}

export const Loader = ({ className }: LoaderProps) => (
    <div className={classNames(styles['lds-ellipsis'], className)}>
        <div />
        <div />
        <div />
        <div />
    </div>
);

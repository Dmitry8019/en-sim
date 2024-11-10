import { FC } from 'react';
import classNames from 'classnames';
import { LinkProps, NavLink } from 'react-router-dom';

import styles from './AppLink.module.scss';

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: AppLinkTheme;
    styleForActive?: string;
}

export const AppLink: FC<AppLinkProps> = (props) => {
    const {
        className,
        styleForActive = '',
        children,
        to,
        theme = AppLinkTheme.PRIMARY,
        ...otherProps
    } = props;

    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                classNames(styles.appLink, { [styleForActive]: isActive }, className, styles[theme])
            }
            {...otherProps}
        >
            {children}
        </NavLink>
    );
};

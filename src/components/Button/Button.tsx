import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

export enum ThemeButton {
    CLEAR = 'clear',
    OUTLINE = 'outline',
    OUTLINE_RED = 'outline_red',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ThemeButton;
    ref?: React.LegacyRef<HTMLButtonElement>;
    disabled?: boolean;
    children?: ReactNode;
    fullWidth?: boolean;
}

export const Button = memo((props: ButtonProps) => {
    const {
        className,
        children,
        theme = ThemeButton.OUTLINE,
        ref,
        disabled,
        fullWidth,
        ...otherProps
    } = props;

    const mods = {
        [styles.button]: !disabled,
        [styles.disabledButton]: disabled,
        [styles.fullWidth]: fullWidth,
    };

    return (
        <button
            type='button'
            className={classNames({ ...mods }, className, styles[theme])}
            ref={ref}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    );
});

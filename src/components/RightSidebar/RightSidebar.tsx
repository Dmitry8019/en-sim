import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { Button, ThemeButton } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import SettingIcon from '../../assets/icons/settings.svg?react';

import styles from './RightSidebar.module.scss';
import { AppTheme } from '../../types';

interface RightSidebarProps {
    className?: string;
    theme: AppTheme;
    onTheme: (theme: AppTheme) => void;
}

export const RightSidebar = (props: RightSidebarProps) => {
    const { className, onTheme, theme } = props;

    const [hideRightSidebar, setHideRightSidebar] = useState(true);
    const elementRef = useRef<HTMLDivElement>(null);

    const handleClick = useCallback((e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!elementRef.current?.contains(target)) {
            setHideRightSidebar(true);
        }
    }, []);

    useEffect(() => {
        if (!hideRightSidebar) {
            document.addEventListener('click', handleClick);
        } else {
            document.removeEventListener('click', handleClick);
        }

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [hideRightSidebar, handleClick]);

    return (
        <div className={className} ref={elementRef}>
            <Button
                theme={ThemeButton.CLEAR}
                onClick={() => setHideRightSidebar(!hideRightSidebar)}
            >
                <Icon Svg={SettingIcon} />
            </Button>

            <div className={classNames(styles.panel, { [styles.hidePanel]: hideRightSidebar })}>
                <div className={styles.wrapper}>
                    <div className={styles.label}>Theme</div>
                    <div
                        className={classNames(styles.text, {
                            [styles.activeText]: theme === AppTheme.LIGHT,
                        })}
                        onClick={() => onTheme(AppTheme.LIGHT)}
                    >
                        Light
                    </div>
                    <div
                        className={classNames(styles.text, {
                            [styles.activeText]: theme === AppTheme.DARK,
                        })}
                        onClick={() => onTheme(AppTheme.DARK)}
                    >
                        Dark
                    </div>
                </div>
            </div>
        </div>
    );
};

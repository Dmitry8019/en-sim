import { useState } from 'react';
import classNames from 'classnames';

import { Icon } from '../Icon/Icon';
import { AppTheme } from '../../types';
import { Button, ThemeButton } from '../Button/Button';
import { ClickOutside } from '../../hooks/ClickOutside';
import { TouchHandler } from '../TouchHandler/TouchHandler';
import { TouchAction } from '../Trainer/types';
import { rightSidebarSwitchState } from '../../store/right-sidebar-switch-state';

import SettingIcon from '../../assets/icons/settings.svg?react';

import styles from './RightSidebar.module.scss';

interface RightSidebarProps {
    className?: string;
    theme: AppTheme;
    onTheme: (theme: AppTheme) => void;
}

export const RightSidebar = (props: RightSidebarProps) => {
    const { className, onTheme, theme } = props;

    const [hideRightSidebar, setHideRightSidebar] = useState(true);

    const handleTouch = (action: TouchAction) => {
        if (action === TouchAction.MOVING_RIGHT) {
            setHideRightSidebar(!hideRightSidebar);
        }
    };

    rightSidebarSwitchState.shareRightSidebarSwitchFun(() =>
        setHideRightSidebar(!hideRightSidebar),
    );

    return (
        <ClickOutside
            className={className}
            onShowElement={() => {
                setHideRightSidebar(true);
            }}
            showElement={!hideRightSidebar}
        >
            <Button
                theme={ThemeButton.CLEAR}
                onClick={() => setHideRightSidebar(!hideRightSidebar)}
            >
                <Icon Svg={SettingIcon} />
            </Button>

            <div className={classNames(styles.panel, { [styles.hidePanel]: hideRightSidebar })}>
                <TouchHandler onTouchAction={handleTouch}>
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
                </TouchHandler>
            </div>
        </ClickOutside>
    );
};

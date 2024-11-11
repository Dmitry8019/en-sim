import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { Button, ThemeButton } from '../Button/Button';
import SettingIcon from '../../assets/icons/settings.svg?react';
import { Icon } from '../Icon/Icon';

import styles from './RightSidebar.module.scss';

interface RightSidebarProps {
    className?: string;
}

export const RightSidebar = (props: RightSidebarProps) => {
    const { className } = props;
    const [hideRightSidebar, setHideRightSidebar] = useState(true);
    const elementRef = useRef<HTMLDivElement>(null);

    const test = useCallback((e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!elementRef.current?.contains(target)) {
            setHideRightSidebar(true);
        }
    }, []);

    useEffect(() => {
        if (!hideRightSidebar) {
            document.addEventListener('click', test);
        } else {
            document.removeEventListener('click', test);
        }

        return () => {
            document.removeEventListener('click', test);
        };
    }, [hideRightSidebar, test]);

    return (
        <div className={className} ref={elementRef}>
            <Button
                theme={ThemeButton.CLEAR}
                onClick={() => setHideRightSidebar(!hideRightSidebar)}
            >
                <Icon Svg={SettingIcon} />
            </Button>

            <div className={classNames(styles.panel, { [styles.hidePanel]: hideRightSidebar })}>
                text
            </div>
        </div>
    );
};

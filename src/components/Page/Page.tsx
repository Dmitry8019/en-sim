import { ReactNode, SyntheticEvent, useEffect, useRef } from 'react';
import classNames from 'classnames';

import { TouchHandler } from '../TouchHandler/TouchHandler';
import { TouchAction } from '../Trainer/types';
import { sidebarSwitchState } from '../../store/sidebar-switch-state';
import { rightSidebarSwitchState } from '../../store/right-sidebar-switch-state';

import styles from './Page.module.scss';

interface PageProps {
    className?: string;
    children: ReactNode;
    onScrollPosition?: (value: number) => void;
    initialPositionScroll?: number;
    disableTouchAction?: boolean;
    onTouchAction?: (action: TouchAction) => void;
    nodesRef?: React.RefObject<HTMLDivElement>;
}

export const Page = (props: PageProps) => {
    const {
        className,
        children,
        onScrollPosition,
        initialPositionScroll,
        disableTouchAction,
        onTouchAction,
        nodesRef,
    } = props;
    const scrollRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (scrollRef.current && initialPositionScroll !== undefined) {
            scrollRef.current.scrollTo(0, initialPositionScroll);
        }
    }, [initialPositionScroll]);

    const handleScroll = (e: SyntheticEvent) => {
        if (onScrollPosition) {
            const target = e.target as HTMLElement;
            onScrollPosition(target.scrollTop);
        }
    };

    const handleTouch = (action: TouchAction) => {
        if (onTouchAction) {
            onTouchAction(action);
            return;
        }

        if (!disableTouchAction) {
            if (action === TouchAction.MOVING_RIGHT) {
                sidebarSwitchState.toggleSidebar?.();
            }

            if (action === TouchAction.MOVING_LEFT) {
                rightSidebarSwitchState.toggleRightSidebar?.();
            }
        }
    };

    return (
        <TouchHandler
            onTouchAction={handleTouch}
            disableTouchAction={disableTouchAction}
            nodesRef={nodesRef}
        >
            <main
                className={classNames(styles.page, className)}
                onScroll={handleScroll}
                ref={scrollRef}
            >
                {children}
            </main>
        </TouchHandler>
    );
};

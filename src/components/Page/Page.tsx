import { ReactNode, SyntheticEvent, useEffect, useRef } from 'react';
import classNames from 'classnames';

import { TouchHandler } from '../TouchHandler/TouchHandler';
import { TouchAction } from '../Trainer/types';
import store from '../../store/Store';

import styles from './Page.module.scss';

interface PageProps {
    className?: string;
    children: ReactNode;
    onScrollPosition?: (value: number) => void;
    initialPositionScroll?: number;
    disableTouchAction?: boolean;
    onTouchAction?: (action: TouchAction) => void;
}

export const Page = (props: PageProps) => {
    const {
        className,
        children,
        onScrollPosition,
        initialPositionScroll,
        disableTouchAction,
        onTouchAction,
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
        if (action === TouchAction.MOVING_RIGHT) {
            if (!disableTouchAction) {
                store.onSidebarSwitch();
            }
        }
        if (action === TouchAction.MOVING_LEFT) {
            if (!disableTouchAction) {
                store.onRightSidebar();
            }
        }
    };

    return (
        <TouchHandler
            onTouchAction={handleTouch}
            disableTouchAction={disableTouchAction}
            isPreventDefault={Boolean(onTouchAction)}
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

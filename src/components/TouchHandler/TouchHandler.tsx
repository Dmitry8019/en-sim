import { ReactNode, useCallback, useEffect, useRef } from 'react';

import { TouchAction } from '../Trainer/types';

import styles from './TouchHandler.module.scss';

interface TouchHandlerProps {
    children: ReactNode;
    onTouchAction: (action: TouchAction) => void;
    disableTouchAction?: boolean;
}

let startX = 0;
let endX = 0;
let startY = 0;
let endY = 0;

export const TouchHandler = (props: TouchHandlerProps) => {
    const { onTouchAction, children, disableTouchAction } = props;
    const elementRef = useRef<HTMLDivElement>(null);

    const handleStart = (e: TouchEvent) => {
        const clientX = e.changedTouches[0].clientX;
        const clientY = e.changedTouches[0].clientY;
        startX = clientX;
        endX = clientX;
        startY = clientY;
        endY = clientY;
    };

    const handleEnd = useCallback(
        (e: TouchEvent) => {
            const wayX = Math.abs(endX - startX);
            const wayY = Math.abs(endY - startY);
            const direction = wayX > wayY;

            if (startX === endX && startY === endY) {
                //
            }

            if (direction && startX < endX) {
                return onTouchAction(TouchAction.MOVING_RIGHT);
            }
            if (direction && startX > endX) {
                return onTouchAction(TouchAction.MOVING_LEFT);
            }

            if (!direction && startY > endY) {
                return onTouchAction(TouchAction.MOVING_UP);
            }
            if (!direction && startY < endY) {
                // e.preventDefault();
                e.stopPropagation();
                onTouchAction(TouchAction.MOVING_DOWN);
            }
        },
        [onTouchAction],
    );

    const handleMove = (e: TouchEvent) => {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
    };

    useEffect(() => {
        const element = elementRef.current;
        if (!element || disableTouchAction) {
            return;
        }
        element.addEventListener('touchstart', handleStart, false);
        element.addEventListener('touchend', handleEnd, false);
        element.addEventListener('touchmove', handleMove, false);

        return () => {
            element.removeEventListener('touchstart', handleStart, false);
            element.removeEventListener('touchend', handleEnd, false);
            element.removeEventListener('touchmove', handleMove, false);
        };
    }, [disableTouchAction, handleEnd]);

    return (
        <div className={styles.touchHandler} ref={elementRef}>
            {children}
        </div>
    );
};

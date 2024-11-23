import { ReactNode, useCallback, useEffect, useRef } from 'react';

import { TouchAction } from '../Trainer/types';

import styles from './TouchHandler.module.scss';

interface TouchHandlerProps {
    children: ReactNode;
    onTouchAction: (action: TouchAction) => void;
    disableTouchAction?: boolean;
    nodesRef?: React.RefObject<HTMLDivElement>;
}

let startX = 0;
let endX = 0;
let startY = 0;
let endY = 0;

export const TouchHandler = (props: TouchHandlerProps) => {
    const { onTouchAction, children, disableTouchAction, nodesRef } = props;
    const elementRef = useRef<HTMLDivElement>(null);
    const isTarget = useRef(false);

    const handleStart = useCallback(
        (e: TouchEvent) => {
            const target = e.target as HTMLElement;
            isTarget.current = nodesRef?.current
                ? Boolean(nodesRef?.current?.contains(target))
                : true;
            if (!isTarget.current) {
                e.preventDefault();
            }

            const clientX = e.changedTouches[0].clientX;
            const clientY = e.changedTouches[0].clientY;
            startX = clientX;
            endX = clientX;
            startY = clientY;
            endY = clientY;
        },
        [nodesRef],
    );

    const handleEnd = useCallback(() => {
        const wayX = Math.abs(endX - startX);
        const wayY = Math.abs(endY - startY);
        const direction = wayX > wayY;

        if (nodesRef?.current && isTarget.current) {
            return;
        }

        if (startX === endX && startY === endY) {
            onTouchAction(TouchAction.START_ACTION);
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
            onTouchAction(TouchAction.MOVING_DOWN);
        }
    }, [nodesRef, onTouchAction]);

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
    }, [disableTouchAction, handleEnd, handleStart]);

    return (
        <div className={styles.touchHandler} ref={elementRef}>
            {children}
        </div>
    );
};

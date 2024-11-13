import { useCallback, useEffect, useRef } from 'react';
import classNames from 'classnames';

import { TextAction } from './types';

import styles from './TouchPanel.module.scss';

let startX = 0;
let endX = 0;
let startY = 0;
let endY = 0;

interface TouchPanelProps {
    className?: string;
    onTextAction: (textAction: TextAction) => void;
}

export const TouchPanel = (props: TouchPanelProps) => {
    const { className, onTextAction } = props;
    const elementRef = useRef<HTMLDivElement>(null);

    const handleStart = (e: TouchEvent) => {
        e.preventDefault();
        const clientX = e.changedTouches[0].clientX;
        const clientY = e.changedTouches[0].clientY;
        startX = clientX;
        endX = clientX;
        startY = clientY;
        endY = clientY;
    };

    const handleEnd = useCallback(() => {
        const wayX = Math.abs(endX - startX);
        const wayY = Math.abs(endY - startY);
        const direction = wayX > wayY;

        if (startX === endX && startY === endY) {
            return onTextAction(TextAction.PLAYBACK);
        }

        if (direction && startX < endX) {
            return onTextAction(TextAction.PREV_TEXT);
        }
        if (direction && startX > endX) {
            return onTextAction(TextAction.NEXT_TEXT);
        }

        if (!direction && startY > endY) {
            return onTextAction(TextAction.SHOW_EN_TEXT);
        }
        if (!direction && startY < endY) {
            onTextAction(TextAction.SHOW_RU_TEXT);
        }
    }, [onTextAction]);

    const handleMove = (e: TouchEvent) => {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
    };

    useEffect(() => {
        const element = elementRef.current;
        if (!element) {
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
    }, [handleEnd]);

    return <div className={classNames(styles.touchPanel, className)} ref={elementRef} />;
};

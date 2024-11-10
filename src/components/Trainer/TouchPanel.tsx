import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import styles from './TouchPanel.module.scss';

let startX = 0;
let endX = 0;
let startY = 0;
let endY = 0;

interface TouchPanelProps {
    className?: string;
    onPrev: VoidFunction;
    onNext: VoidFunction;
    onShowEn: VoidFunction;
    onShowRu: VoidFunction;
}

export const TouchPanel = (props: TouchPanelProps) => {
    const { className, onNext, onPrev, onShowEn, onShowRu } = props;
    const elementRef = useRef<HTMLDivElement>(null);
    const [showTouch, setShowTouch] = useState(true);

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
            return setShowTouch(!showTouch);
        }

        if (direction && startX < endX) {
            onPrev();
        }
        if (direction && startX > endX) {
            onNext();
        }

        if (!direction && startY > endY) {
            onShowEn();
        }
        if (!direction && startY < endY) {
            onShowRu();
        }
    }, [onNext, onPrev, onShowEn, onShowRu, showTouch]);

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

    return (
        <div
            className={classNames(styles.touchPanel, className, { [styles.showTouch]: !showTouch })}
            ref={elementRef}
        >
            {!showTouch && 'Touch Panel'}
        </div>
    );
};

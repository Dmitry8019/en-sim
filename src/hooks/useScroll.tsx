import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { LocationState } from '../components/TrainerPage/initialData';

export const useScroll = (len: number) => {
    const { state: locationState }: { state: LocationState } = useLocation();
    const initScrollPos: number = locationState?.scrollPosition ?? 0;
    const scrollPositionRef = useRef(initScrollPos);
    const [initialScrollPosition, setInitialScrollPosition] = useState(0);

    useEffect(() => {
        if (len > 0) {
            setInitialScrollPosition(initScrollPos);
        }
    }, [initScrollPos, len]);

    const handleScrollPosition = (value: number) => {
        scrollPositionRef.current = value;
    };

    const getScrollPosition = () => {
        return scrollPositionRef.current;
    };

    return { onScrollPosition: handleScrollPosition, getScrollPosition, initialScrollPosition };
};

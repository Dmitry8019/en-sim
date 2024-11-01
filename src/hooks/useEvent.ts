import { useCallback, useLayoutEffect, useRef } from 'react';

export function useEvent<Args extends unknown[], R>(fn: (...args: Args) => R) {
    const fnRef = useRef(fn);

    useLayoutEffect(() => {
        fnRef.current = fn;
    }, [fn]);

    const eventCb = useCallback((...args: Args): R => {
        const fn = fnRef.current;
        return fn(...args);
    }, []);

    return eventCb;
}

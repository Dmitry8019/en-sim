import { useCallback, useEffect } from 'react';

import { TouchAction } from './types';

export const useKeyboardHandler = (callback: (textAction: TouchAction) => void) => {
    const processKeyboardUp = useCallback(
        ({ code }: KeyboardEvent) => {
            switch (code) {
                case 'Numpad8': {
                    callback(TouchAction.MOVING_UP);
                    break;
                }
                case 'Numpad2': {
                    callback(TouchAction.MOVING_DOWN);
                    break;
                }
                case 'Numpad6': {
                    callback(TouchAction.MOVING_LEFT);
                    break;
                }
                case 'Numpad4': {
                    callback(TouchAction.MOVING_RIGHT);
                    break;
                }
                case 'Numpad5': {
                    callback(TouchAction.START_ACTION);
                }
            }
        },
        [callback],
    );

    useEffect(() => {
        document.addEventListener('keyup', processKeyboardUp);

        return () => {
            document.removeEventListener('keyup', processKeyboardUp);
        };
    }, [processKeyboardUp]);
};

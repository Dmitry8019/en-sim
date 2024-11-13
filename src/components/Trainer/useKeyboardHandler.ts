import { useCallback, useEffect } from 'react';

import { TextAction } from './types';

export const useKeyboardHandler = (callback: (textAction: TextAction) => void) => {
    const processKeyboardUp = useCallback(
        ({ code }: KeyboardEvent) => {
            switch (code) {
                case 'Numpad8': {
                    callback(TextAction.SHOW_EN_TEXT);
                    break;
                }
                case 'Numpad2': {
                    callback(TextAction.SHOW_RU_TEXT);
                    break;
                }
                case 'Numpad6': {
                    callback(TextAction.NEXT_TEXT);
                    break;
                }
                case 'Numpad4': {
                    callback(TextAction.PREV_TEXT);
                    break;
                }
                case 'Numpad5': {
                    callback(TextAction.PLAYBACK);
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

import { useCallback, useEffect } from 'react';

export const useKeyboardHandler = (
    onNext: VoidFunction,
    onPrev: VoidFunction,
    onShowEn: VoidFunction,
    onShowRu: VoidFunction,
) => {
    const processKeyboardUp = useCallback(
        ({ code }: KeyboardEvent) => {
            if (code === 'Numpad8') return onShowEn();
            if (code === 'Numpad2') return onShowRu();
            if (code === 'Numpad6') return onNext();
            if (code === 'Numpad4') onPrev();
        },
        [onNext, onPrev, onShowEn, onShowRu],
    );

    useEffect(() => {
        document.addEventListener('keyup', processKeyboardUp);

        return () => {
            document.removeEventListener('keyup', processKeyboardUp);
        };
    }, [processKeyboardUp]);
};

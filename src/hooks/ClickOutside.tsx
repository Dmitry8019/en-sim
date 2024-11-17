import { ReactNode, useCallback, useEffect, useRef } from 'react';

interface useClickOutsideProps {
    className?: string;
    children: ReactNode;
    showElement: boolean;
    onShowElement: VoidFunction;
}

export const ClickOutside = (props: useClickOutsideProps) => {
    const { className, children, onShowElement, showElement } = props;
    const elementRef = useRef<HTMLDivElement>(null);

    const handleClick = useCallback(
        (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!elementRef.current?.contains(target)) {
                onShowElement();
            }
        },
        [onShowElement],
    );

    useEffect(() => {
        if (showElement) {
            document.addEventListener('click', handleClick, true);
        } else {
            document.removeEventListener('click', handleClick, true);
        }

        return () => {
            document.removeEventListener('click', handleClick, true);
        };
    }, [handleClick, showElement]);

    return (
        <div ref={elementRef} className={className}>
            {children}
        </div>
    );
};

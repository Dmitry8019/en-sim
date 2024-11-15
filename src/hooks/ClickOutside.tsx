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
            document.addEventListener('click', handleClick);
        } else {
            document.removeEventListener('click', handleClick);
        }

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [handleClick, showElement]);

    return (
        <div ref={elementRef} className={className}>
            {children}
        </div>
    );
};

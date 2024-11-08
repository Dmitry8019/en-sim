import { ReactNode, SyntheticEvent, useEffect, useRef } from 'react';
import classNames from 'classnames';

import styles from './Page.module.scss';

interface PageProps {
    className?: string;
    children: ReactNode;
    onScrollPosition?: (value: number) => void;
    initialPositionScroll?: number;
}

export const Page = (props: PageProps) => {
    const { className, children, onScrollPosition, initialPositionScroll } = props;
    const scrollRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (scrollRef.current && initialPositionScroll !== undefined) {
            scrollRef.current.scrollTo(0, initialPositionScroll);
        }
    }, [initialPositionScroll]);

    const handleScroll = (e: SyntheticEvent) => {
        if (onScrollPosition) {
            const target = e.target as HTMLElement;
            onScrollPosition(target.scrollTop);
        }
    };

    return (
        <main
            className={classNames(styles.page, className)}
            onScroll={handleScroll}
            ref={scrollRef}
        >
            {children}
        </main>
    );
};

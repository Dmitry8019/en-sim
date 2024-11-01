import { useMemo, useState } from 'react';
import classNames from 'classnames';

import { useEvent } from '../../hooks/useEvent';
import { SidebarSwitchButton } from '../SidebarSwitchButton/SidebarSwitchButton';
import { LOCAL_STORAGE_SIDEBAR_SWITCHER_KEY } from '../../const/localStorage';
import { sidebarItemsList } from './sidebarItemList';
import { SidebarItem } from './SidebarItem';

import styles from './Sidebar.module.scss';

enum SidebarSwitcher {
    SHOW = 'show',
    HIDE = 'hide',
}

const defaultSidebarSwitcher =
    (localStorage.getItem(LOCAL_STORAGE_SIDEBAR_SWITCHER_KEY) as SidebarSwitcher) ||
    SidebarSwitcher.SHOW;

interface SidebarProps {
    className?: string;
}

export const Sidebar = (props: SidebarProps) => {
    const { className } = props;

    const [sidebarSwitchStatus, setSidebarSwitchStatus] =
        useState<SidebarSwitcher>(defaultSidebarSwitcher);
    const isBurger = sidebarSwitchStatus === SidebarSwitcher.SHOW;

    const itemsList = useMemo(
        () =>
            sidebarItemsList.map((item) => (
                <SidebarItem item={item} collapsed={isBurger} key={item.path} />
            )),
        [isBurger],
    );

    const sidebarSwitchHandler = useEvent(() => {
        const newStatus =
            sidebarSwitchStatus === SidebarSwitcher.SHOW
                ? SidebarSwitcher.HIDE
                : SidebarSwitcher.SHOW;
        setSidebarSwitchStatus(newStatus);
        localStorage.setItem(LOCAL_STORAGE_SIDEBAR_SWITCHER_KEY, newStatus);
    });

    return (
        <>
            <SidebarSwitchButton onToggle={sidebarSwitchHandler} />
            <aside
                className={classNames(styles.sidebar, { [styles.collapsed]: !isBurger }, className)}
            >
                <div className={styles.blockDev}>
                    <div>{itemsList}</div>
                    <div className={classNames(styles.dev, { [styles.hideText]: !isBurger })}>
                        &#169; 2025 D.A.Dadychyn
                    </div>
                </div>
            </aside>
        </>
    );
};

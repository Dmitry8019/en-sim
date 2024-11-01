import { memo } from 'react';
import classNames from 'classnames';

import { ISidebarItem } from './sidebarItemList';
import { AppLink, AppLinkTheme } from '../AppLink/AppLink';

import styles from './sidebarItem.module.scss';

interface SidebarItemProps {
    item: ISidebarItem;
    collapsed: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
    return (
        <AppLink
            theme={AppLinkTheme.PRIMARY}
            to={item.path}
            className={styles.link}
            styleForActive={styles.linkActive}
        >
            <div className={styles.wrapperSvg}>
                <item.Icon />
            </div>
            <div className={classNames(styles.text, { [styles.hideText]: !collapsed }, [])}>
                {item.text}
            </div>
        </AppLink>
    );
});

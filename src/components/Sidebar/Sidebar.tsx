import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { useEvent } from '../../hooks/useEvent';
import { SidebarSwitchButton } from '../SidebarSwitchButton/SidebarSwitchButton';
import {
    LOCAL_STORAGE_SIDEBAR_SWITCHER_KEY,
    USER_LOCAL_STORAGE_KEY,
} from '../../const/localStorage';
import { sidebarItemsList } from './sidebarItemList';
import { SidebarItem } from './SidebarItem';
import { Button, ThemeButton } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import EnSimIcon from '../../../public/favicon.svg?react';
import LogoutIcon from '../../assets/icons/person-prohibited.svg?react';
import { Modal } from '../Modals/Modal';
import { ClickOutside } from '../../hooks/ClickOutside';
import { FormLogin, LoginForm } from '../LoginForm/LoginForm';
import { useLoginByUserNameMutation } from './loginByUserName.query';
import { User } from './loginApi';

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

    const [showModal, setShowModal] = useState(false);
    const isLogin = Boolean(localStorage.getItem(USER_LOCAL_STORAGE_KEY));

    const saveAuth = (auth: User) => {
        setShowModal(false);
        localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(auth));
        window.location.reload();
    };
    const location = useLocation();
    const { loginByUserName } = useLoginByUserNameMutation(saveAuth);

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

    useEffect(() => {
        const status = SidebarSwitcher.HIDE;
        if (window.matchMedia('(max-width: 710px)').matches) {
            setSidebarSwitchStatus(status);
            localStorage.setItem(LOCAL_STORAGE_SIDEBAR_SWITCHER_KEY, status);
        }
    }, [location]);

    const handleLogout = (value: boolean) => {
        if (value) {
            localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
            window.location.reload();
        }
        setShowModal(false);
    };

    const handleLogin = (formData: FormLogin) => {
        loginByUserName(formData);
    };

    return (
        <>
            <SidebarSwitchButton onToggle={sidebarSwitchHandler} />
            <aside
                className={classNames(styles.sidebar, { [styles.collapsed]: !isBurger }, className)}
            >
                <div className={styles.blockDev}>
                    <div>{itemsList}</div>
                    <div>
                        <ClickOutside
                            onShowElement={() => setShowModal(false)}
                            showElement={showModal}
                        >
                            <Button
                                theme={ThemeButton.CLEAR}
                                className={classNames(styles.auth, {
                                    [styles.hideAuth]: !isBurger,
                                })}
                                onClick={() => setShowModal(!showModal)}
                            >
                                <Icon Svg={isLogin ? EnSimIcon : LogoutIcon} />
                                <p
                                    className={classNames({
                                        [styles.hideText]: !isBurger,
                                    })}
                                >
                                    {isLogin ? 'Logout' : 'Login'}
                                </p>
                            </Button>
                            <Modal
                                title={isLogin ? 'Logout' : 'Login'}
                                text={isLogin ? 'Are you sure?' : ''}
                                showConfirm={showModal}
                            >
                                {isLogin ? (
                                    <>
                                        <Button
                                            theme={ThemeButton.CLEAR}
                                            onClick={() => handleLogout(true)}
                                        >
                                            Yes
                                        </Button>
                                        <Button
                                            theme={ThemeButton.CLEAR}
                                            onClick={() => handleLogout(false)}
                                        >
                                            No
                                        </Button>
                                    </>
                                ) : (
                                    <LoginForm onLogin={handleLogin} />
                                )}
                            </Modal>
                        </ClickOutside>
                        <div className={classNames(styles.dev, { [styles.hideText]: !isBurger })}>
                            &#169; 2025 D.A.Dadychyn
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

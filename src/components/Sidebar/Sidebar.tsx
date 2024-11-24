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
import EnSimIcon from '../../assets/icons/favicon.svg?react';
import LogoutIcon from '../../assets/icons/person-prohibited.svg?react';
import { Modal } from '../Modals/Modal';
import { ClickOutside } from '../../hooks/ClickOutside';
import { FormLogin, LoginForm } from '../LoginForm/LoginForm';
import { useLoginByUserNameMutation } from './loginByUserName.query';
import { User } from './loginApi';
import { TouchHandler } from '../TouchHandler/TouchHandler';
import { TouchAction } from '../Trainer/types';
import { sidebarSwitchState } from '../../store/sidebar-switch-state';

import styles from './Sidebar.module.scss';

enum SidebarSwitcher {
    SHOW = 'show',
    HIDE = 'hide',
}

const defaultSidebarSwitcher =
    (localStorage.getItem(LOCAL_STORAGE_SIDEBAR_SWITCHER_KEY) as SidebarSwitcher) ||
    SidebarSwitcher.HIDE;

interface SidebarProps {
    className?: string;
}

export const Sidebar = (props: SidebarProps) => {
    const { className } = props;

    const [showModal, setShowModal] = useState(false);
    const [sidebarSwitchStatus, setSidebarSwitchStatus] =
        useState<SidebarSwitcher>(defaultSidebarSwitcher);

    const isSidebarVisible = sidebarSwitchStatus === SidebarSwitcher.SHOW;
    const isLogin = Boolean(localStorage.getItem(USER_LOCAL_STORAGE_KEY));
    const title = isLogin ? 'Logout' : 'Login';
    const isMobile = window.matchMedia('(max-width: 710px)').matches;
    const location = useLocation();

    const handleModal = (value: boolean) => {
        setShowModal(value);
        loginByUserNameReset();
    };

    const saveAuth = (auth: User) => {
        handleModal(false);

        if (isMobile) {
            setSidebarSwitchStatus(SidebarSwitcher.HIDE);
        }

        setTimeout(() => {
            if (isMobile) {
                localStorage.setItem(LOCAL_STORAGE_SIDEBAR_SWITCHER_KEY, SidebarSwitcher.HIDE);
            }

            localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(auth));
            window.location.reload();
        }, 500);
    };

    const {
        loginByUserName,
        isLoginByUserNameError,
        loginByUserNameReset,
        isLoginByUserNamePending,
    } = useLoginByUserNameMutation(saveAuth);

    const itemsList = useMemo(
        () =>
            sidebarItemsList.map((item) => (
                <SidebarItem item={item} collapsed={isSidebarVisible} key={item.path} />
            )),
        [isSidebarVisible],
    );

    const sidebarSwitchHandler = useEvent(() => {
        const newStatus = isSidebarVisible ? SidebarSwitcher.HIDE : SidebarSwitcher.SHOW;
        setSidebarSwitchStatus(newStatus);
        localStorage.setItem(LOCAL_STORAGE_SIDEBAR_SWITCHER_KEY, newStatus);
    });

    sidebarSwitchState.shareSidebarSwitchFun(sidebarSwitchHandler);

    useEffect(() => {
        const status = SidebarSwitcher.HIDE;
        if (isMobile) {
            setSidebarSwitchStatus(status);
            localStorage.setItem(LOCAL_STORAGE_SIDEBAR_SWITCHER_KEY, status);
        }
    }, [location, isMobile]);

    const handleLogout = (value: boolean) => {
        if (value) {
            if (isMobile) {
                setSidebarSwitchStatus(SidebarSwitcher.HIDE);
            }
            setTimeout(() => {
                localStorage.clear();
                window.location.reload();
            }, 500);
        }
        handleModal(false);
    };

    const handleLogin = (formData: FormLogin) => {
        loginByUserName(formData);
    };

    const handleTouch = (action: TouchAction) => {
        if (action === TouchAction.MOVING_LEFT && isSidebarVisible) {
            sidebarSwitchHandler();
        }

        if (action === TouchAction.MOVING_RIGHT && !isSidebarVisible) {
            sidebarSwitchHandler();
        }
    };

    return (
        <>
            <SidebarSwitchButton onToggle={sidebarSwitchHandler} />
            <aside
                className={classNames(
                    styles.sidebar,
                    { [styles.collapsed]: !isSidebarVisible },
                    className,
                )}
            >
                <TouchHandler onTouchAction={handleTouch} disableTouchAction={showModal}>
                    <div className={styles.wrapper}>
                        <div>{itemsList}</div>
                        <div>
                            <ClickOutside
                                onShowElement={() => handleModal(false)}
                                showElement={showModal}
                            >
                                <Button
                                    theme={ThemeButton.CLEAR}
                                    className={classNames(styles.auth, {
                                        [styles.hideAuth]: !isSidebarVisible,
                                    })}
                                    onClick={() => handleModal(!showModal)}
                                >
                                    <Icon Svg={isLogin ? EnSimIcon : LogoutIcon} />
                                    <p
                                        className={classNames({
                                            [styles.hideText]: !isSidebarVisible,
                                        })}
                                    >
                                        {title}
                                    </p>
                                </Button>
                                <Modal
                                    title={title}
                                    text={isLogin ? 'Are you sure?' : ''}
                                    showConfirm={showModal}
                                >
                                    {isLogin ? (
                                        <>
                                            <Button
                                                theme={ThemeButton.CLEAR}
                                                onClick={() => handleLogout(true)}
                                                className={styles.button}
                                            >
                                                Yes
                                            </Button>
                                            <Button
                                                theme={ThemeButton.CLEAR}
                                                onClick={() => handleLogout(false)}
                                                className={styles.button}
                                            >
                                                No
                                            </Button>
                                        </>
                                    ) : (
                                        <LoginForm
                                            onLogin={handleLogin}
                                            isError={isLoginByUserNameError}
                                            isReset={showModal}
                                            disabled={isLoginByUserNamePending}
                                        />
                                    )}
                                </Modal>
                            </ClickOutside>
                            <div
                                className={classNames(styles.copyright, {
                                    [styles.hideText]: !isSidebarVisible,
                                })}
                            >
                                &#169; 2025 D.A.Dadychyn
                            </div>
                        </div>
                    </div>
                </TouchHandler>
            </aside>
        </>
    );
};

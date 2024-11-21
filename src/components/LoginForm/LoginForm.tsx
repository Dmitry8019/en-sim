import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { Button, ThemeButton } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import CloseEyeIcon from '../../assets/icons/close-eye.svg?react';
import OpenEyeIcon from '../../assets/icons/open-eye.svg?react';

import styles from './LoginForm.module.scss';

export interface FormLogin {
    username: string;
    password: string;
}

interface LoginFormProps {
    className?: string;
    onLogin: (formData: FormLogin) => void;
    isError: boolean;
    isReset: boolean;
    disabled: boolean;
}

export const LoginForm = (props: LoginFormProps) => {
    const { className, onLogin, isError, isReset, disabled } = props;
    const [username, setUsername] = useState('');
    const [login, setLogin] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setUsername('');
        setLogin('');
        setShowPassword(false);
    }, [isReset]);

    return (
        <div className={classNames(styles.loginForm, className)}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const username = formData.get('username');
                    const password = formData.get('password');
                    if (username && password) {
                        onLogin({ username, password } as FormLogin);
                    }
                }}
            >
                <p>Login *</p>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    name='username'
                    type='text'
                    disabled={disabled}
                />
                <p>Password *</p>
                <div className={styles.wrapperPassword}>
                    <input
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        name='password'
                        type={showPassword ? 'text' : 'password'}
                        disabled={disabled}
                    />
                    <Icon
                        Svg={showPassword ? CloseEyeIcon : OpenEyeIcon}
                        className={styles.icon}
                        onClick={() => setShowPassword(!showPassword)}
                    />
                </div>
                <Button
                    theme={ThemeButton.CLEAR}
                    type='submit'
                    disabled={disabled}
                    className={styles.button}
                >
                    Submit
                </Button>
                {isError && <div className={styles.error}>Invalid password or login</div>}
            </form>
        </div>
    );
};

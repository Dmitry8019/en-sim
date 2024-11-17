import classNames from 'classnames';
import styles from './LoginForm.module.scss';
import { Button, ThemeButton } from '../Button/Button';

export interface FormLogin {
    username: string;
    password: string;
}

interface LoginFormProps {
    className?: string;
    onLogin: (formData: FormLogin) => void;
}

export const LoginForm = (props: LoginFormProps) => {
    const { className, onLogin } = props;

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
                <p>Login</p>
                <input name='username' type='text' />
                <p>Password</p>
                <input name='password' type='password' />
                <Button theme={ThemeButton.CLEAR} type='submit'>
                    Submit
                </Button>
            </form>
        </div>
    );
};

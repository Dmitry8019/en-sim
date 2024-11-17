import { useMutation } from '@tanstack/react-query';
import { loginApi, LoginByUsernameProps, User } from './loginApi';

export const useLoginByUserNameMutation = (saveAuth: (token: User) => void) => {
    const {
        mutate: loginByUserName,
        isError: isLoginByUserNameError,
        isSuccess: isLoginByUserNameSuccess,
    } = useMutation({
        mutationFn: (authData: LoginByUsernameProps) => loginApi.login(authData),
        onSuccess: (data: User) => {
            saveAuth(data);
        },
    });

    return {
        loginByUserName,
        isLoginByUserNameError,
        isLoginByUserNameSuccess,
    };
};

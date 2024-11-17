import { $api } from '../../api/api';

export interface User {
    token: string | null;
}
export interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginApi = {
    login: async (authData: LoginByUsernameProps) => {
        const { data } = await $api.post<User>('/login', authData);
        return data;
    },
};

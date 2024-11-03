import { $api } from './api';

export interface LessonsStateType {
    id: string;
    name: string;
}

const lessonsApi = {
    getAllLessons: async (level: string) => {
        const { data } = await $api.get<LessonsStateType[]>(level);
        return data;
    },
};

export default lessonsApi;

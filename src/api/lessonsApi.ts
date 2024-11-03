import { $api } from './api';

export interface LessonsStateType {
    id: number;
    name: string;
}

const lessonsApi = {
    getAllLessons: async (level: string) => {
        const { data } = await $api.get<LessonsStateType[]>(level);
        return data;
    },
};

export default lessonsApi;

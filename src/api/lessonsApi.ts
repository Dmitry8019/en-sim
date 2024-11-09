import { $api } from './api';

export interface LessonsStateType {
    id: number;
    name: string;
}

export interface SentencesStateType {
    id: string;
    en: string;
    transcription: string;
    ru: string;
    audio: string;
}

const lessonsApi = {
    getAllLessons: async (level: string) => {
        const { data } = await $api.get<LessonsStateType[]>(level);
        return data;
    },
    getAllSentences: async (lesson: string) => {
        const { data } = await $api.get<SentencesStateType[]>(lesson);
        return data;
    },
};

export default lessonsApi;

export interface LocationState {
    id?: string;
    selectedOption: Option;
    scrollPosition: number;
}

export interface Option {
    id: number;
    sound: boolean;
    en: boolean;
    ru: boolean;
}

export const levels = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'stories', 'sentences'];
export const options: Option[] = [
    {
        id: 1,
        sound: true,
        en: false,
        ru: false,
    },
    {
        id: 2,
        sound: false,
        en: true,
        ru: false,
    },
    {
        id: 3,
        sound: false,
        en: false,
        ru: true,
    },
    {
        id: 4,
        sound: true,
        en: true,
        ru: false,
    },
    {
        id: 5,
        sound: true,
        en: false,
        ru: true,
    },
    {
        id: 6,
        sound: false,
        en: true,
        ru: true,
    },
    {
        id: 7,
        sound: true,
        en: true,
        ru: true,
    },
];

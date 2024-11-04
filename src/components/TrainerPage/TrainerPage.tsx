import { useState } from 'react';
import classNames from 'classnames';

import { Page } from '../Page/Page';
import { LevelSelectionPanel } from '../LevelSelectionPanel/LevelSelectionPanel';
import { OptionSelectionPanel } from '../OptionSelectionPanel/OptionSelectionPanel';
import { useGetLessonsQuery } from './lessons.query';
import { Button, ThemeButton } from '../Button/Button';

import styles from './TrainerPage.module.scss';

export interface Option {
    sound: boolean;
    en: boolean;
    ru: boolean;
}

const levels = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1'];
const options: Option[] = [
    {
        sound: true,
        en: false,
        ru: false,
    },
    {
        sound: false,
        en: true,
        ru: false,
    },
    {
        sound: false,
        en: false,
        ru: true,
    },
    {
        sound: true,
        en: false,
        ru: true,
    },
    {
        sound: true,
        en: true,
        ru: false,
    },
    {
        sound: false,
        en: true,
        ru: true,
    },
    {
        sound: true,
        en: true,
        ru: true,
    },
];

interface TrainerPageProps {
    className?: string;
}

export const TrainerPage = (props: TrainerPageProps) => {
    const { className } = props;
    const [selectedLevel, setSelectedLevel] = useState(levels[0]);
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [selectedLesson, setSelectedLesson] = useState(1);
    const { lessons = [] } = useGetLessonsQuery(selectedLevel);

    return (
        <Page>
            <div className={classNames(styles.trainerPage, className)}>
                <LevelSelectionPanel
                    selectedLevel={selectedLevel}
                    onSelectedLevel={(level) => {
                        setSelectedLevel(level);
                        setSelectedLesson(1);
                    }}
                    levels={levels}
                />
                <OptionSelectionPanel
                    selectedOption={selectedOption}
                    onSelectedOption={setSelectedOption}
                    options={options}
                    className={styles.panel}
                />
                {lessons.map((item) => {
                    const id = Number(item.id);
                    return (
                        <Button
                            className={classNames(styles.list, {
                                [styles.active]: id === selectedLesson,
                            })}
                            theme={ThemeButton.CLEAR}
                            key={id}
                            onClick={() => setSelectedLesson(id)}
                        >
                            <div>{id + '.'}</div>
                            <div>{item.name}</div>
                        </Button>
                    );
                })}
                <Button theme={ThemeButton.CLEAR} className={styles.start}>
                    Start
                </Button>
            </div>
        </Page>
    );
};

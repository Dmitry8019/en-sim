import { useState } from 'react';
import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

import { Page } from '../Page/Page';
import { LevelSelectionPanel } from '../LevelSelectionPanel/LevelSelectionPanel';
import { OptionSelectionPanel } from '../OptionSelectionPanel/OptionSelectionPanel';
import { useGetLessonsQuery } from './lessons.query';
import { Button, ThemeButton } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { levels, options } from './initialData';
import { useScroll } from '../../hooks/useScroll';

import styles from './TrainerPage.module.scss';

interface TrainerPageProps {
    className?: string;
}

export const TrainerPage = (props: TrainerPageProps) => {
    const { className } = props;

    const navigate = useNavigate();
    const location = useLocation();

    const ids = location.state?.id.split('_') ?? null;
    const [initialLevel, initialLesson] = ids ? [ids[0], Number(ids[1])] : [levels[0], 1];
    const initialOption =
        options.find((item) => item.id === location.state?.selectedOption.id) ?? options[0];

    const [selectedLevel, setSelectedLevel] = useState(initialLevel);
    const [selectedOption, setSelectedOption] = useState(initialOption);
    const [selectedLesson, setSelectedLesson] = useState(initialLesson);

    const { lessons = [], isLessonsLoading, isLessonsError } = useGetLessonsQuery(selectedLevel);

    const { onScrollPosition, getScrollPosition, initialScrollPosition } = useScroll(
        lessons.length,
    );

    return (
        <Page onScrollPosition={onScrollPosition} initialPositionScroll={initialScrollPosition}>
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
                {isLessonsLoading && (
                    <div className={styles.loader}>
                        <Loader />
                    </div>
                )}
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
                {isLessonsError && <div className={styles.login}>You need to Login</div>}
                <Button
                    theme={ThemeButton.CLEAR}
                    className={styles.start}
                    onClick={() => {
                        if (isLessonsError) {
                            return;
                        }
                        navigate(`${selectedLevel}_${selectedLesson}`, {
                            state: { selectedOption, scrollPosition: getScrollPosition() },
                        });
                    }}
                >
                    Start
                </Button>
            </div>
        </Page>
    );
};

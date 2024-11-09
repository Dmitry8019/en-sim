import { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import { Page } from '../Page/Page';
import { Button, ThemeButton } from '../Button/Button';
import { getRouteTrainer } from '../../const/router';
import { Content } from './Content/Content';
import { Loader } from '../Loader/Loader';
import { useGetSentencesQuery } from './trainer.query';

import styles from './Trainer.module.scss';

type Params = {
    id: string;
};

interface TrainerProps {
    className?: string;
}

export const Trainer = (props: TrainerProps) => {
    const { className } = props;
    const [sentenceIndex, setSentenceIndex] = useState(0);

    const { id } = useParams<Params>();
    const { state } = useLocation();
    const navigate = useNavigate();
    const [selectedLevel, selectedLesson] = id?.split('_') ?? ['A0, 1'];

    const { sentences = [], isSentencesLoading } = useGetSentencesQuery(
        `${selectedLevel}_${selectedLesson}`,
    );

    if (isSentencesLoading) {
        return <Loader />;
    }

    const handleNext = () => {
        const newIndex = sentenceIndex + 1;
        if (newIndex > sentences.length) {
            return;
        }
        setSentenceIndex(newIndex);
    };

    const handlePrev = () => {
        const newIndex = sentenceIndex - 1;
        if (newIndex < 0) {
            return;
        }
        setSentenceIndex(newIndex);
    };
    return (
        <Page className={className}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <Button
                        onClick={() => {
                            navigate(getRouteTrainer(), {
                                state: { id, ...state },
                            });
                        }}
                        theme={ThemeButton.CLEAR}
                        className={styles.button}
                    >
                        Exit
                    </Button>
                    <p>{`Level: ${selectedLevel}`}</p>
                    <p>{`Lesson: ${selectedLesson}`}</p>
                </div>
                <p>{`${sentenceIndex + 1}${' / '}${sentences.length}`}</p>
            </div>
            <Content
                lang='en'
                sentence={sentences[sentenceIndex].en}
                transcription={sentences[sentenceIndex].transcription}
                isShowText={state.selectedOption.en}
                isSound={state.selectedOption.sound}
            />
            <Content
                lang='ru'
                sentence={sentences[sentenceIndex].ru}
                isShowText={state.selectedOption.ru}
            />
            <div className={styles.footer}>
                <Button onClick={handlePrev} theme={ThemeButton.CLEAR} className={styles.button}>
                    Prev
                </Button>
                <Button onClick={handleNext} theme={ThemeButton.CLEAR} className={styles.button}>
                    Next
                </Button>
            </div>
        </Page>
    );
};

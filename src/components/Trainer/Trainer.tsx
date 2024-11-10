import { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import { Page } from '../Page/Page';
import { Button, ThemeButton } from '../Button/Button';
import { getRouteTrainer } from '../../const/router';
import { Content } from './Content/Content';
import { Loader } from '../Loader/Loader';
import { useGetSentencesQuery } from './trainer.query';
import { TouchPanel } from './TouchPanel';

import styles from './Trainer.module.scss';

type Params = {
    id: string;
};

interface TrainerProps {
    className?: string;
}

export const Trainer = (props: TrainerProps) => {
    const { className } = props;

    const { id } = useParams<Params>();
    const { state } = useLocation();
    const navigate = useNavigate();

    const [sentenceIndex, setSentenceIndex] = useState(0);
    const [showEn, setShowEn] = useState<boolean>(state.selectedOption.en);
    const [showRu, setShowRu] = useState<boolean>(state.selectedOption.ru);

    const [selectedLevel, selectedLesson] = id?.split('_') ?? ['A0, 1'];

    const { sentences = [], isSentencesLoading } = useGetSentencesQuery(
        `${selectedLevel}_${selectedLesson}`,
    );

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

    if (isSentencesLoading) {
        return <Loader />;
    }

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
                isTouchText={showEn}
                isSound={state.selectedOption.sound}
            />
            <Content
                lang='ru'
                sentence={sentences[sentenceIndex].ru}
                isShowText={state.selectedOption.ru}
                isTouchText={showRu}
            />
            <div className={styles.footer}>
                <Button onClick={handlePrev} theme={ThemeButton.CLEAR} className={styles.button}>
                    Prev
                </Button>
                <Button onClick={handleNext} theme={ThemeButton.CLEAR} className={styles.button}>
                    Next
                </Button>
                <TouchPanel
                    onNext={handleNext}
                    onPrev={handlePrev}
                    onShowEn={() => setShowEn(!showEn)}
                    onShowRu={() => setShowRu(!showRu)}
                />
            </div>
        </Page>
    );
};

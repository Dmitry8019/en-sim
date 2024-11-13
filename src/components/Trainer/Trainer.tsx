import { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { Page } from '../Page/Page';
import { Button, ThemeButton } from '../Button/Button';
import { getRouteTrainer } from '../../const/router';
import { Content } from './Content/Content';
import { Loader } from '../Loader/Loader';
import { useGetSentencesQuery } from './trainer.query';
import { TouchPanel } from './TouchPanel';
import { useKeyboardHandler } from './useKeyboardHandler';
import VolumeIcon from '../../assets/icons/volume.svg?react';
import { Icon } from '../Icon/Icon';
import { useStore } from '../../store/StoreContext';
import { TextAction } from './types';

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
    const store = useStore();

    const [sentenceIndex, setSentenceIndex] = useState(0);
    const [showEn, setShowEn] = useState<boolean>(state.selectedOption.en);
    const [showRu, setShowRu] = useState<boolean>(state.selectedOption.ru);
    const [isPlaying, setIsPlaying] = useState(false);

    const [selectedLevel, selectedLesson] = id?.split('_') ?? ['A0, 1'];

    const { sentences = [], isSentencesLoading } = useGetSentencesQuery(
        `${selectedLevel}_${selectedLesson}`,
    );

    const handleNext = () => {
        const newIndex = sentenceIndex + 1;
        if (newIndex >= sentences.length) {
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

    const playSound = (text: string) => {
        store.playSound(
            text,
            'en',
            () => {
                setIsPlaying(true);
            },
            () => {
                setIsPlaying(false);
            },
        );
    };

    const handleTextAction = (textAction: TextAction) => {
        switch (textAction) {
            case TextAction.SHOW_EN_TEXT: {
                setShowEn(!showEn);
                break;
            }
            case TextAction.SHOW_RU_TEXT: {
                setShowRu(!showRu);
                break;
            }
            case TextAction.NEXT_TEXT: {
                handleNext();
                setShowEn(state.selectedOption.en);
                setShowRu(state.selectedOption.ru);
                break;
            }
            case TextAction.PREV_TEXT: {
                handlePrev();
                setShowEn(state.selectedOption.en);
                setShowRu(state.selectedOption.ru);
                break;
            }
            case TextAction.PLAYBACK: {
                playSound(sentences[sentenceIndex].en);
            }
        }
    };

    useKeyboardHandler(handleTextAction);

    if (isSentencesLoading) {
        return <Loader />;
    }

    return (
        <Page className={className}>
            {window.matchMedia('(max-width: 710px)').matches && (
                <TouchPanel onTextAction={handleTextAction} />
            )}
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <p>{`Level: ${selectedLevel}`}</p>
                    <p>{`Lesson: ${selectedLesson}`}</p>
                </div>
                <p>{`${sentenceIndex + 1}${' / '}${sentences.length}`}</p>
            </div>
            <Content
                sentence={sentences[sentenceIndex].en}
                transcription={sentences[sentenceIndex].transcription}
                showText={showEn}
                onShowText={() => setShowEn(!showEn)}
                onPlayback={(text: string) => {
                    playSound(text);
                }}
            />
            <Content
                sentence={sentences[sentenceIndex].ru}
                showText={showRu}
                onShowText={() => setShowRu(!showRu)}
            />
            <div className={styles.footer}>
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
                <Button
                    onClick={() => {
                        playSound(sentences[sentenceIndex].en);
                    }}
                    theme={ThemeButton.CLEAR}
                    className={classNames(styles.button, { [styles.buttonActive]: isPlaying })}
                >
                    <Icon Svg={VolumeIcon} />
                </Button>
                {!window.matchMedia('(max-width: 710px)').matches && (
                    <>
                        <Button
                            onClick={handlePrev}
                            theme={ThemeButton.CLEAR}
                            className={styles.button}
                        >
                            Prev
                        </Button>
                        <Button
                            onClick={handleNext}
                            theme={ThemeButton.CLEAR}
                            className={styles.button}
                        >
                            Next
                        </Button>
                    </>
                )}
            </div>
        </Page>
    );
};

import { useEffect, useRef, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { Page } from '../Page/Page';
import { Button, ThemeButton } from '../Button/Button';
import { getRouteTrainer } from '../../const/router';
import { Content } from './Content/Content';
import { Loader } from '../Loader/Loader';
import { useGetSentencesQuery } from './trainer.query';
import { useKeyboardHandler } from './useKeyboardHandler';
import { Icon } from '../Icon/Icon';
import { TouchAction } from './types';
import VolumeIcon from '../../assets/icons/volume.svg?react';
import SettingsIcon from '../../assets/icons/settings.svg?react';
import store from '../../store/Store';
import { Settings } from './Settings';
import { LocationState } from '../TrainerPage/initialData';

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
    const { state }: { state: LocationState } = useLocation();
    const navigate = useNavigate();
    store.initVoices();

    const [sentenceIndex, setSentenceIndex] = useState(0);
    const [showEn, setShowEn] = useState<boolean>(state?.selectedOption.en);
    const [showRu, setShowRu] = useState<boolean>(state?.selectedOption.ru);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const trainerRef = useRef<HTMLDivElement>(null);

    const [selectedLevel, selectedLesson] = id?.split('_') ?? ['A0, 1'];

    const {
        sentences = [],
        sentenceStatus,
        isSentencesError,
    } = useGetSentencesQuery(`${selectedLevel}_${selectedLesson}`);

    const playSound = (text: string) => {
        store.playSound(
            text,
            () => {
                setIsPlaying(true);
            },
            () => {
                setIsPlaying(false);
            },
        );
    };

    useEffect(() => {
        if (sentenceStatus === 'idle' && sentences.length > 0 && state.selectedOption.sound) {
            playSound(sentences[0].en);
        }
    }, [sentences, sentenceStatus, state]);

    const handleNext = () => {
        const newIndex = sentenceIndex + 1;
        if (newIndex >= sentences.length) {
            return;
        }
        if (state.selectedOption.sound) {
            playSound(sentences[newIndex].en);
        }
        setSentenceIndex(newIndex);
    };

    const handlePrev = () => {
        const newIndex = sentenceIndex - 1;
        if (newIndex < 0) {
            return;
        }
        if (state.selectedOption.sound) {
            playSound(sentences[newIndex].en);
        }
        setSentenceIndex(newIndex);
    };

    const handleTextAction = (action: TouchAction) => {
        switch (action) {
            case TouchAction.MOVING_UP: {
                setShowEn(!showEn);
                break;
            }
            case TouchAction.MOVING_DOWN: {
                setShowRu(!showRu);
                break;
            }
            case TouchAction.MOVING_LEFT: {
                handleNext();
                setShowEn(state.selectedOption.en);
                setShowRu(state.selectedOption.ru);
                break;
            }
            case TouchAction.MOVING_RIGHT: {
                handlePrev();
                setShowEn(state.selectedOption.en);
                setShowRu(state.selectedOption.ru);
                break;
            }
            case TouchAction.START_ACTION: {
                playSound(sentences[sentenceIndex].en);
            }
        }
    };

    useKeyboardHandler(handleTextAction);

    if (sentenceStatus !== 'idle') {
        return <Loader />;
    }

    if (isSentencesError) {
        return <div className={styles.login}>You need to Login</div>;
    }

    return (
        <Page className={className} onTouchAction={handleTextAction} nodesRef={trainerRef}>
            <div ref={trainerRef}>
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
                    <Settings
                        onShowSettings={() => setShowSettings(false)}
                        showSettings={showSettings}
                        className={styles.wrapperSettings}
                    >
                        <Button
                            theme={ThemeButton.CLEAR}
                            className={styles.button}
                            onClick={() => setShowSettings(!showSettings)}
                        >
                            <Icon Svg={SettingsIcon} />
                        </Button>
                        <Button
                            onClick={() => {
                                playSound(sentences[sentenceIndex].en);
                            }}
                            theme={ThemeButton.CLEAR}
                            className={classNames(styles.button, {
                                [styles.buttonActive]: isPlaying,
                            })}
                        >
                            <Icon Svg={VolumeIcon} />
                        </Button>
                    </Settings>
                    {!window.matchMedia('(max-width: 710px)').matches && (
                        <>
                            <Button
                                onClick={() => handleTextAction(TouchAction.MOVING_RIGHT)}
                                theme={ThemeButton.CLEAR}
                                className={styles.button}
                            >
                                Prev
                            </Button>
                            <Button
                                onClick={() => handleTextAction(TouchAction.MOVING_LEFT)}
                                theme={ThemeButton.CLEAR}
                                className={styles.button}
                            >
                                Next
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </Page>
    );
};

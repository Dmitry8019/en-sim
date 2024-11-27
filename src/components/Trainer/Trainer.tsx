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
import SettingsIcon from '../../assets/icons/settings-trainer.svg?react';
import store from '../../store/Store';
import { Settings } from './Settings';
import { LocationState } from '../TrainerPage/initialData';

import styles from './Trainer.module.scss';

let repetitionCounter = 0;

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
    const [autoPlay, setAutoPlay] = useState(0);
    const [delay, setDelay] = useState(1);
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
        let timeId = 0;

        if (!isPlaying && autoPlay) {
            repetitionCounter++;
            if (repetitionCounter >= autoPlay) {
                repetitionCounter = 0;
                timeId = setTimeout(
                    () => handleTextAction(TouchAction.MOVING_LEFT, true),
                    delay * 1000,
                );
                return;
            }
            timeId = setTimeout(
                () => handleTextAction(TouchAction.START_ACTION, true),
                delay * 1000,
            );
        }

        return () => {
            clearTimeout(timeId);
        };
    }, [isPlaying, autoPlay, delay]);

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

    const handleTextAction = (action: TouchAction, allowed?: boolean) => {
        const isAutoPlay = autoPlay && !allowed;
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
                if (isAutoPlay) {
                    break;
                }
                handleNext();
                setShowEn(state.selectedOption.en);
                setShowRu(state.selectedOption.ru);
                break;
            }
            case TouchAction.MOVING_RIGHT: {
                if (isAutoPlay) {
                    break;
                }
                handlePrev();
                setShowEn(state.selectedOption.en);
                setShowRu(state.selectedOption.ru);
                break;
            }
            case TouchAction.START_ACTION: {
                if (isAutoPlay) {
                    return;
                }
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
                    onPlayback={autoPlay ? undefined : playSound}
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
                        autoPlay={autoPlay}
                        onAutoPlay={setAutoPlay}
                        delay={delay}
                        onDelay={setDelay}
                    >
                        <Button
                            theme={ThemeButton.CLEAR}
                            className={classNames(styles.button, styles.settingIcon)}
                            onClick={() => setShowSettings(!showSettings)}
                        >
                            <Icon Svg={SettingsIcon} />
                        </Button>
                        <Button
                            onClick={() => {
                                handleTextAction(TouchAction.START_ACTION);
                            }}
                            theme={ThemeButton.CLEAR}
                            className={classNames(styles.button, {
                                [styles.buttonActive]: isPlaying,
                            })}
                            disabled={Boolean(autoPlay)}
                        >
                            <Icon Svg={VolumeIcon} />
                        </Button>
                    </Settings>
                    <Button
                        onClick={() => handleTextAction(TouchAction.MOVING_RIGHT)}
                        theme={ThemeButton.CLEAR}
                        className={classNames(styles.button, styles.hideButton)}
                        disabled={Boolean(autoPlay)}
                    >
                        Prev
                    </Button>
                    <Button
                        onClick={() => handleTextAction(TouchAction.MOVING_LEFT)}
                        theme={ThemeButton.CLEAR}
                        className={classNames(styles.button, styles.hideButton)}
                        disabled={Boolean(autoPlay)}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </Page>
    );
};

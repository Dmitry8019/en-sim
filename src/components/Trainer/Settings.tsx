import { ReactNode, useState } from 'react';
import classNames from 'classnames';

import store from '../../store/Store';
import { Button, ThemeButton } from '../Button/Button';
import { ClickOutside } from '../../hooks/ClickOutside';
import { TouchHandler } from '../TouchHandler/TouchHandler';
import { TouchAction } from './types';

import styles from './Settings.module.scss';

interface SettingsProps {
    className?: string;
    children: ReactNode;
    showSettings: boolean;
    onShowSettings: VoidFunction;
    autoPlay: number;
    onAutoPlay: (value: number) => void;
    delay: number;
    onDelay: (value: number) => void;
}

export const Settings = (props: SettingsProps) => {
    const {
        className,
        children,
        onShowSettings,
        showSettings,
        onAutoPlay,
        autoPlay,
        delay,
        onDelay,
    } = props;

    const [activeVoice, setActiveVoice] = useState(store.voiceEnIndex);
    const [rate, setRate] = useState(store.rate);

    const handleVoice = (index: number) => {
        store.setVoiceEnIndex(index);
        setActiveVoice(index);
    };

    const handleRate = (value: number) => {
        const newRate = Number((rate + value).toFixed(1));
        if (newRate < 0.1 || newRate > 2) {
            return;
        }
        setRate(newRate);
        store.setRate(newRate);
    };

    const resetRate = () => {
        setRate(1);
        store.setRate(1);
    };

    const handleTouch = (action: TouchAction) => {
        if (action === TouchAction.MOVING_RIGHT) {
            onShowSettings();
        }
    };

    return (
        <ClickOutside
            className={className}
            onShowElement={onShowSettings}
            showElement={showSettings}
        >
            {children}
            <TouchHandler onTouchAction={handleTouch}>
                <div
                    className={classNames(styles.settings, {
                        [styles.hideSettings]: !showSettings,
                    })}
                >
                    <div className={styles.wrapper}>
                        <div className={styles.label}>Speed</div>
                        <div className={styles.speed}>
                            <Button theme={ThemeButton.CLEAR} onClick={() => handleRate(-0.1)}>
                                <div className={styles.arrowLeft} />
                            </Button>
                            <Button theme={ThemeButton.CLEAR} onClick={resetRate}>
                                {rate.toFixed(1)}
                            </Button>
                            <Button theme={ThemeButton.CLEAR} onClick={() => handleRate(0.1)}>
                                <div className={styles.arrowRight} />
                            </Button>
                        </div>
                    </div>

                    <div className={styles.wrapper}>
                        <div className={styles.label}>Auto Play</div>
                        <div className={styles.speed}>
                            {[1, 2, 3].map((item) => {
                                return (
                                    <Button
                                        className={classNames(styles.button, {
                                            [styles.active]: item === autoPlay,
                                        })}
                                        key={item}
                                        theme={ThemeButton.CLEAR}
                                        onClick={() => {
                                            onAutoPlay(autoPlay === item ? 0 : item);
                                        }}
                                    >
                                        {item}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>

                    <div className={styles.wrapper}>
                        <div className={styles.label}>Delay</div>
                        <div className={styles.speed}>
                            {[1, 2, 3, 4, 5].map((item) => {
                                return (
                                    <Button
                                        className={classNames(styles.button, {
                                            [styles.active]: item === delay,
                                        })}
                                        key={item}
                                        theme={ThemeButton.CLEAR}
                                        onClick={() => {
                                            onDelay(item);
                                        }}
                                    >
                                        {`${item}s`}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>

                    {store.voicesEn.length > 0 && (
                        <div className={styles.wrapper}>
                            <div className={styles.label}>Voices</div>
                            <div className={styles.wrapperVoices}>
                                {store.voicesEn.map((item, index) => {
                                    return (
                                        <div
                                            tabIndex={0}
                                            key={item.name}
                                            onClick={() => handleVoice(index)}
                                            className={classNames(styles.voice, {
                                                [styles.activeVoice]: activeVoice === index,
                                            })}
                                        >
                                            {item.name}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </TouchHandler>
        </ClickOutside>
    );
};

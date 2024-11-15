import { ReactNode, useState } from 'react';
import classNames from 'classnames';

import store from '../../store/Store';
import { Button, ThemeButton } from '../Button/Button';
import { ClickOutside } from '../../hooks/ClickOutside';

import styles from './Settings.module.scss';

interface SettingsProps {
    className?: string;
    children: ReactNode;
    showSettings: boolean;
    onShowSettings: VoidFunction;
}

export const Settings = (props: SettingsProps) => {
    const { className, children, onShowSettings, showSettings } = props;

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

    return (
        <ClickOutside
            className={className}
            onShowElement={onShowSettings}
            showElement={showSettings}
        >
            {children}
            <div className={classNames(styles.settings, { [styles.hideSettings]: !showSettings })}>
                <div className={styles.wrapper}>
                    <div className={styles.label}>Speed</div>
                    <div className={styles.speed}>
                        <Button
                            theme={ThemeButton.CLEAR}
                            className={styles.button}
                            onClick={() => handleRate(-0.1)}
                        >
                            -
                        </Button>
                        <Button
                            theme={ThemeButton.CLEAR}
                            className={styles.button}
                            onClick={resetRate}
                        >
                            {rate.toFixed(1)}
                        </Button>
                        <Button
                            theme={ThemeButton.CLEAR}
                            className={styles.button}
                            onClick={() => handleRate(0.1)}
                        >
                            +
                        </Button>
                    </div>
                </div>
                {store.voicesEn.length > 0 && (
                    <div className={styles.wrapper}>
                        <div className={styles.label}>Voices</div>
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
                )}
            </div>
        </ClickOutside>
    );
};

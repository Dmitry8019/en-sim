import { MouseEvent, useEffect, useState } from 'react';
import classNames from 'classnames';

import { Button, ThemeButton } from '../../Button/Button';
import { Icon } from '../../Icon/Icon';
import CopyIcon from '../../../assets/icons/content-copy.svg?react';
import ChoiceIcon from '../../../assets/icons/choice.svg?react';
import SoundIcon from '../../../assets/icons/volume.svg?react';
import ResetIcon from '../../../assets/icons/reset.svg?react';

import styles from './Content.module.scss';

interface ContentProps {
    className?: string;
    sentence: string;
    showText: boolean;
    onShowText: VoidFunction;
    transcription?: string;
    onPlayback?: (text: string) => void;
}

export const Content = (props: ContentProps) => {
    const { className, sentence, transcription, showText, onShowText, onPlayback } = props;

    const [isShowTitle, setIsShowTitle] = useState(false);
    const [isEditingMode, setIsEditingMode] = useState(false);
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
    const isShowText = isEditingMode ? true : showText;

    const handleReset = () => {
        setIsEditingMode(false);
        setSelectedIndexes([]);
    };

    useEffect(() => {
        handleReset();
    }, [sentence]);

    const handleSelectedIndexes = (index: number) => {
        if (!isEditingMode) {
            return;
        }
        const search = selectedIndexes.includes(index);
        if (search) {
            const abc = [...selectedIndexes];
            const newAbc = abc.filter((item) => item !== index);
            setSelectedIndexes(newAbc);
        } else {
            const abc = [...selectedIndexes];
            abc.push(index);
            setSelectedIndexes(abc);
        }
    };

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        const tagName = (e.target as HTMLDivElement).tagName;
        if (tagName === 'path' || tagName === 'svg') {
            return;
        }
        if (!isEditingMode) {
            onShowText();
        }
    };

    const showTitle = () => {
        setIsShowTitle(true);
        setTimeout(() => setIsShowTitle(false), 500);
    };

    const copyToClipBoard = (text: string) => {
        showTitle();
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    };

    const handleEditingMode = () => {
        if (!isShowText) {
            onShowText();
        }
        if (!isEditingMode) {
            setIsEditingMode(true);
        }
        if (isEditingMode && selectedIndexes.length < 1) {
            setIsEditingMode(false);
        }
        if (selectedIndexes.length > 0) {
            const abc = sentence.split(' ');
            const newAbc = abc.filter((_, index) => selectedIndexes.includes(index)).join(' ');
            onPlayback?.(newAbc);
        }
    };

    return (
        <div
            className={classNames(styles.content, className, {
                [styles.marginBottom]: !transcription,
            })}
            onClick={handleClick}
            tabIndex={0}
        >
            {sentence.split(' ').map((word, i) => {
                return (
                    <span
                        key={i}
                        onClick={() => handleSelectedIndexes(i)}
                        className={classNames(
                            { [styles.hideText]: !isShowText },
                            { [styles.activeWord]: selectedIndexes.includes(i) },
                        )}
                    >
                        {word}{' '}
                    </span>
                );
            })}
            <p className={classNames(styles.transcription, { [styles.hideText]: !isShowText })}>
                {transcription}
            </p>

            <div className={styles.groupButton}>
                {transcription && (
                    <>
                        <Button theme={ThemeButton.CLEAR} onClick={handleReset}>
                            <Icon Svg={ResetIcon} />
                        </Button>
                        <Button
                            theme={ThemeButton.CLEAR}
                            className={classNames({
                                [styles.activeButton]: isEditingMode,
                            })}
                            onClick={handleEditingMode}
                        >
                            {selectedIndexes.length > 0 ? (
                                <Icon Svg={SoundIcon} />
                            ) : (
                                <Icon Svg={ChoiceIcon} />
                            )}
                        </Button>
                    </>
                )}
                <Button theme={ThemeButton.CLEAR} onClick={() => copyToClipBoard(sentence)}>
                    <Icon Svg={CopyIcon} />
                    {isShowTitle && <div className={styles.showCopy}>Copy</div>}
                </Button>
            </div>
        </div>
    );
};

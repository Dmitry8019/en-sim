import { MouseEvent, useLayoutEffect, useState } from 'react';
import classNames from 'classnames';

import { Button, ThemeButton } from '../../Button/Button';
import { Icon } from '../../Icon/Icon';
import CopyIcon from '../../../assets/icons/content-copy.svg?react';

import styles from './Content.module.scss';

interface ContentProps {
    className?: string;
    sentence: string;
    isShowText: boolean;
    transcription?: string;
    isSound?: boolean;
    lang: string;
}

export const Content = (props: ContentProps) => {
    const { className, sentence, transcription, isShowText, isSound, lang } = props;
    const [showText, setShowText] = useState(isShowText);
    const [isShowTitle, setIsShowTitle] = useState(false);

    const startPlaying = (text: string) => {
        console.log(text);
        // playing(text, lang)
    };

    useLayoutEffect(() => {
        setShowText(isShowText);
        if (isSound) {
            startPlaying(sentence);
        }
    }, [isShowText, isSound, sentence]);

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        const tagName = (e.target as HTMLDivElement).tagName;
        console.log(tagName);
        if ((tagName === 'SPAN' && showText) || tagName === 'path' || tagName === 'svg') {
            return;
        }
        setShowText(!showText);
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

    return (
        <div
            className={classNames(styles.content, className, {
                [styles.marginBottom]: lang === 'ru',
            })}
            onClick={handleClick}
            tabIndex={0}
        >
            {sentence.split(' ').map((word, i) => {
                return (
                    <span
                        key={i}
                        onClick={() => startPlaying(word)}
                        className={classNames({ [styles.hideText]: !showText })}
                    >
                        {word}{' '}
                    </span>
                );
            })}
            <p className={classNames({ [styles.hideText]: !showText })}>{transcription}</p>

            <Button
                theme={ThemeButton.CLEAR}
                className={styles.button}
                onClick={() => copyToClipBoard(sentence)}
            >
                <Icon Svg={CopyIcon} />
                {isShowTitle && <div className={styles.showCopy}>Copy</div>}
            </Button>
        </div>
    );
};

import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { Button, ThemeButton } from '../Button/Button';
import { useStore } from '../../store/StoreContext';
import { Icon } from '../Icon/Icon';
import SettingIcon from '../../assets/icons/settings.svg?react';

import styles from './RightSidebar.module.scss';

interface RightSidebarProps {
    className?: string;
}

export const RightSidebar = (props: RightSidebarProps) => {
    const { className } = props;
    const store = useStore();

    const [hideRightSidebar, setHideRightSidebar] = useState(true);
    const [enIndex, setEnIndex] = useState(store.voiceEnIndex);
    const [ruIndex, setRuIndex] = useState(store.voiceRuIndex);
    const elementRef = useRef<HTMLDivElement>(null);

    const handleClick = useCallback((e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!elementRef.current?.contains(target)) {
            setHideRightSidebar(true);
        }
    }, []);

    useEffect(() => {
        if (!hideRightSidebar) {
            document.addEventListener('click', handleClick);
        } else {
            document.removeEventListener('click', handleClick);
        }

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [hideRightSidebar, handleClick]);

    return (
        <div className={className} ref={elementRef}>
            <Button
                theme={ThemeButton.CLEAR}
                onClick={() => setHideRightSidebar(!hideRightSidebar)}
            >
                <Icon Svg={SettingIcon} />
            </Button>

            <div className={classNames(styles.panel, { [styles.hidePanel]: hideRightSidebar })}>
                <label htmlFor='en'>Voices EN</label>
                <select
                    name='en'
                    id='en'
                    value={enIndex}
                    className={styles.select}
                    onChange={(e) => {
                        const value = Number(e.target.value);
                        store.setVoiceEnIndex(value);
                        setEnIndex(value);
                    }}
                >
                    {store.voicesEn.map((item, index) => {
                        return (
                            <option key={index} value={index}>
                                {item.name}
                            </option>
                        );
                    })}
                </select>
                <label htmlFor='ru'>Voices RU</label>
                <select
                    name='ru'
                    id='ru'
                    value={ruIndex}
                    className={styles.select}
                    onChange={(e) => {
                        const value = Number(e.target.value);
                        store.setVoiceRuIndex(value);
                        setRuIndex(value);
                    }}
                >
                    {store.voicesRu.map((item, index) => {
                        return (
                            <option key={index} value={index}>
                                {item.name}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
};

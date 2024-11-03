import classNames from 'classnames';

import { Button, ThemeButton } from '../Button/Button';

import styles from './LevelSelectionPanel.module.scss';

interface LevelSelectionPanelProps {
    className?: string;
    selectedLevel: string;
    onSelectedLevel: (level: string) => void;
    levels: string[];
}

export const LevelSelectionPanel = (props: LevelSelectionPanelProps) => {
    const { className, levels, onSelectedLevel, selectedLevel } = props;

    return (
        <div className={classNames(styles.levelSelectionPanel, className)}>
            {levels.map((item) => {
                return (
                    <Button
                        theme={ThemeButton.CLEAR}
                        className={classNames(styles.button, {
                            [styles.active]: item === selectedLevel,
                        })}
                        onClick={() => onSelectedLevel(item)}
                        key={item}
                    >
                        {item}
                    </Button>
                );
            })}
        </div>
    );
};

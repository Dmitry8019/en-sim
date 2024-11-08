import classNames from 'classnames';

import { Button, ThemeButton } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import Sound from '../../assets/icons/volume.svg?react';
import { Option } from '../TrainerPage/initialData';

import styles from './OptionSelectionPanel.module.scss';

interface LevelSelectionPanelProps {
    className?: string;
    selectedOption: Option;
    onSelectedOption: (option: Option) => void;
    options: Option[];
}

export const OptionSelectionPanel = (props: LevelSelectionPanelProps) => {
    const { className, options, onSelectedOption, selectedOption } = props;

    return (
        <div className={classNames(styles.optionSelectionPanel, className)}>
            {options.map((item, index) => {
                return (
                    <Button
                        theme={ThemeButton.CLEAR}
                        className={classNames(styles.button, {
                            [styles.active]: item === selectedOption,
                        })}
                        onClick={() => onSelectedOption(item)}
                        key={index}
                    >
                        <div className={styles.wrapper}>
                            {item.sound && <Icon Svg={Sound} />}
                            {item.en && <div>en</div>}
                            {item.ru && <div>ru</div>}
                        </div>
                    </Button>
                );
            })}
        </div>
    );
};

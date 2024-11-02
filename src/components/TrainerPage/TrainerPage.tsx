import { useState } from 'react';
import classNames from 'classnames';

import { Page } from '../Page/Page';
import { LevelSelectionPanel } from '../LevelSelectionPanel/LevelSelectionPanel';

import styles from './TrainerPage.module.scss';

const levels = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1'];

interface TrainerPageProps {
    className?: string;
}

export const TrainerPage = (props: TrainerPageProps) => {
    const { className } = props;
    const [selectedLevel, setSelectedLevel] = useState(levels[0]);

    return (
        <Page>
            <div className={classNames(styles.trainerPage, className)}>
                <LevelSelectionPanel
                    selectedLevel={selectedLevel}
                    onSelectedLevel={setSelectedLevel}
                    levels={levels}
                />
            </div>
        </Page>
    );
};

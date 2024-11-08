import { useParams, useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { Page } from '../Page/Page';
import { Button } from '../Button/Button';
import { getRouteTrainer } from '../../const/router';

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
    const { state } = useLocation();
    const navigate = useNavigate();

    return (
        <Page>
            <div className={classNames(styles.trainer, className)}>Trainer</div>
            <Button
                onClick={() => {
                    navigate(getRouteTrainer(), {
                        state: { id, ...state },
                    });
                }}
            >
                Exit
            </Button>
        </Page>
    );
};

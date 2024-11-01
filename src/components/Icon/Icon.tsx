import classNames from 'classnames';

import styles from './Icon.module.scss';

interface IconProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
    Svg: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const Icon = (props: IconProps) => {
    const { className, Svg, ...otherProps } = props;

    return <Svg className={classNames(styles.icon, className)} {...otherProps} />;
};

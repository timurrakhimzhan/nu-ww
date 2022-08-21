import React from "react";
import styles from "./Cta.module.scss";
import ArrowRightSvg from "../arrow-right-svg/ArrowRightSvg";
import clsx from "clsx";

type CtaProps = {
    onClick?: () => void;
    label: string;
    iconVisible?: boolean
    size?: 'md' | 'sm',
    fullWidth?: boolean
}

const Cta: React.FC<CtaProps> = ({onClick, label, iconVisible, fullWidth, size = 'md'}) => {
    return <button className={clsx(styles.cta, fullWidth && styles.fullWidth, size === 'sm' && styles.smallText)} onClick={onClick}>
        <span>{label}</span>
        {iconVisible && <ArrowRightSvg fill={'url(#paint0_linear_573_150)'}/>}
    </button>
}

export default Cta;
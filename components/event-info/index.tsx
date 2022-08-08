import React from "react";

import styles from './EventInfo.module.scss';

type EventInfoProps = {
    heading: string;
    subheading: string;
    description: string;
    isHidden?: boolean;
}

const EventInfo: React.FC<EventInfoProps> = ({ heading, subheading, description, isHidden = false}) => {
    return <article aria-hidden={isHidden} className={styles.wrapper}>
        <h1 className={styles.heading}>{heading}</h1>
        <h4 className={styles.subheading}>{subheading}</h4>
        <p className={styles.description}>{description}</p>
    </article>
}

export default EventInfo;
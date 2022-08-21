import React from "react";

import styles from './EventInfo.module.scss';
import EventsTable from "../events-table";
import ClubsList from "../clubs-list";

export type EventInfoProps = {
    heading: string;
    subheading: string;
    description: string;
    isHidden?: boolean;
    eventsSchedule?: Array<{
        time: string;
        venue: string;
        event: string;
    }>;
    clubList?: Array<string>
}

const EventInfo: React.FC<EventInfoProps> = ({ heading, subheading, description, eventsSchedule, clubList, isHidden = false}) => {
    return <article aria-hidden={isHidden} className={styles.wrapper}>
        <h1 className={styles.heading}>{heading}</h1>
        <h4 className={styles.subheading}>{subheading}</h4>
        {clubList && <div className={styles.tableWrapper}><ClubsList clubs={clubList}/></div>}
        {eventsSchedule && <div className={styles.tableWrapper}><EventsTable items={eventsSchedule}/></div>}
        <p className={styles.description}>{description}</p>



    </article>
}

export default EventInfo;
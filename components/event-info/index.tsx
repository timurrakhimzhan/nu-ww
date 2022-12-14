import React, {useEffect, useRef, useState} from "react";

import styles from './EventInfo.module.scss';
import EventsTable from "../events-table";
import dynamic from "next/dynamic";

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

const ClientClubsList = dynamic(() => import("../clubs-list"), { ssr: false });

const EventInfo: React.FC<EventInfoProps> = ({ heading, subheading, description, eventsSchedule, clubList}) => {
    const ref = useRef<HTMLElement>(null)
    useEffect(() => {
        if(ref.current) {
            ref.current.scrollIntoView()
        }
    }, [])
    return <article className={styles.wrapper} ref={ref}>
        <h1 className={styles.heading}>{heading}</h1>
        <h4 className={styles.subheading}>{subheading}</h4>
        <p className={styles.description}>{description}</p>
        {clubList &&  <div className={styles.clubWrapper}><ClientClubsList clubs={clubList}/></div>}
        {eventsSchedule && <div className={styles.tableWrapper}><EventsTable items={eventsSchedule}/></div>}
    </article>
}

export default EventInfo;
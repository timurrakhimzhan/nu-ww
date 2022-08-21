import styles from './EventsTable.module.scss';
import React from "react";

type EventsTableProps = {
    items: Array<{
        time: string;
        event: string;
        venue: string;
    }>
}

const EventsTable: React.FC<EventsTableProps> = ({items}) => {
    return <div className={styles.wrapper}>
        <div className={styles.headerCell}>Time</div>
        <div className={styles.headerCell}>Event</div>
        <div className={styles.headerCell}>Venue</div>
        {
            items.map((item) => (
                <React.Fragment key={item.event}>
                    <div className={styles.time}>{item.time}</div>
                    <div className={styles.cell}>{item.event}</div>
                    <div className={styles.cell}>{item.venue}</div>
                </React.Fragment>
            ))
        }
    </div>
}

export default EventsTable;
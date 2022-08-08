import styles from './EventNavigation.module.scss';
import React from "react";

type EventNavigationProps = {
    items: Array<{
        imgUrl?: string;
        id: number;
        name: string;
        date: string;
    }>
    chosenId?: number;
    onItemClick: (id: number) => void;
}

const EventNavigation: React.FC<EventNavigationProps> = ({items, chosenId, onItemClick}) => {
    return <nav className={styles.wrapper}>
        {items.map((item) => (
            <div key={item.id} className={styles.item} aria-selected={chosenId === item.id} onClick={() => onItemClick(item.id)}>
                <p className={styles.name}>{item.name}</p>
                <p className={styles.date}>{item.date}</p>
            </div>
        ))}
    </nav>
}

export default EventNavigation;
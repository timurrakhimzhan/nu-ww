import type { NextPage } from 'next'
import DefaultLayout from "../../layouts/default-layout";
import EventInfo from "../../components/event-info";
import EventNavigation from "../../components/event-navigation";

import styles from './../../styles/modules/EventCalendar.module.scss';
import {useMemo, useState} from "react";

const events = [
    {
        id: 0,
        name: 'Academic and Professional Day',
        date: 'Mon, Aug 22',
        dateFull: 'Day 1 - Monday, August 22',
        description: `Bir bale anau mnau production Можно информацию про клубы`
    },
    {
        id: 1,
        name: 'Social Day',
        date: 'Tue, Aug 23',
        dateFull: 'Day 2 - Tuesday, August 23',
        description: `Bir bale anau mnau production Можно информацию про клубы`
    },
    {
        id: 2,
        name: 'Art and Entertainment Day',
        date: 'Wed, Aug 24',
        dateFull: 'Day 3 - Wednesday, August 24',
        description: `Bir bale anau mnau production Можно информацию про клубы`
    },
    {
        id: 3,
        name: 'Sports and Dance Day',
        date: 'Wed, Aug 25',
        dateFull: 'Day 4 - Thursday, August 25',
        description: `Bir bale anau mnau production Можно информацию про клубы`
    },
    {
        id: 4,
        name: 'Student Government. Concert/Party',
        date: 'Thu, Aug 26',
        dateFull: 'Day 5 - Friday, August 26',
        description: `Bir bale anau mnau production Можно информацию про клубы`
    }
]

const EventsCalendar: NextPage = () => {
    const [eventId, setEventId] = useState<number>(0);
    return (
        <DefaultLayout>
            <section className={styles.eventSection}>
                {
                    events.map((event) => (
                        <div key={event.id} className={styles.eventInfoWrapper}>
                            <EventInfo heading={event.name} subheading={event.dateFull} description={event.description} isHidden={event.id !== eventId} />
                        </div>
                    ))
                }
            </section>
            <section className={styles.navSection}>
                <EventNavigation items={events} chosenId={eventId} onItemClick={(id) => setEventId(id)} />
            </section>
        </DefaultLayout>
    )
}

export default EventsCalendar

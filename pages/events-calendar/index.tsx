import type { NextPage } from 'next'
import DefaultLayout from "../../layouts/default-layout";
import EventInfo from "../../components/event-info";
import EventNavigation from "../../components/event-navigation";

import styles from './../../styles/modules/EventCalendar.module.scss';
import {useMemo, useState} from "react";
import {useMediaQuery} from "@chakra-ui/react";
import eventsScheduleDay1 from './../../public/assets/events-calendar/events-day1.json';
import clubsDay1 from './../../public/assets/events-calendar/clubs-day1.json';
import EventsTable from "../../components/events-table";


const events = [
    {
        id: 0,
        name: 'Academic and Professional Day',
        date: 'Mon, Aug 22',
        dateFull: 'Day 1 - Monday, August 22',
        description: ``,
        imgUrl: '/assets/day1.jpg',
        eventsSchedule: eventsScheduleDay1,
        clubsList: clubsDay1
    },
    {
        id: 1,
        name: 'Social Day',
        date: 'Tue, Aug 23',
        dateFull: 'Day 2 - Tuesday, August 23',
        description: ``,
        imgUrl: '/assets/day2.jpg'
    },
    {
        id: 2,
        name: 'Art and Entertainment Day',
        date: 'Wed, Aug 24',
        dateFull: 'Day 3 - Wednesday, August 24',
        description: ``,
        imgUrl: '/assets/day3.jpg'
    },
    {
        id: 3,
        name: 'Sports and Dance Day',
        date: 'Wed, Aug 25',
        dateFull: 'Day 4 - Thursday, August 25',
        description: ``,
        imgUrl: '/assets/day4.jpg'
    },
    {
        id: 4,
        name: 'Student Government. Concert/Party',
        date: 'Thu, Aug 26',
        dateFull: 'Day 5 - Friday, August 26',
        description: ``,
        imgUrl: '/assets/day5.jpg'
    }
]

const EventsCalendar: NextPage = () => {
    const [eventId, setEventId] = useState<number>(0);
    const [isMobile] = useMediaQuery('(max-width: 1280px)');
    return (
        <DefaultLayout>
            <div className={styles.wrapper}>
                <section className={styles.eventSection}>
                    {
                        events.map((event) => (
                            <div key={event.id} className={styles.eventInfoWrapper}>
                                <EventInfo heading={event.name} subheading={event.dateFull}
                                           eventsSchedule={event.eventsSchedule}
                                           description={event.description}
                                           clubList={event.clubsList}
                                           isHidden={event.id !== eventId}/>
                            </div>
                        ))
                    }
                </section>
                <section className={styles.navSection}>
                    <EventNavigation items={events} chosenId={eventId} onItemClick={(id) => setEventId(id)}/>
                </section>
            </div>

        </DefaultLayout>
    )
}

export default EventsCalendar

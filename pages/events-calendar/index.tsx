import type { NextPage } from 'next'
import DefaultLayout from "../../layouts/default-layout";
import EventInfo from "../../components/event-info";
import EventNavigation from "../../components/event-navigation";

import styles from './../../styles/modules/EventCalendar.module.scss';
import {useMemo, useState} from "react";
import eventsScheduleDay1 from './../../public/assets/events-calendar/events-day1.json';
import clubsDay1 from './../../public/assets/events-calendar/clubs-day1.json';
import eventsScheduleDay2 from './../../public/assets/events-calendar/events-day2.json';
import clubsDay2 from './../../public/assets/events-calendar/clubs-day2.json';
import eventsScheduleDay3 from './../../public/assets/events-calendar/events-day3.json';
import clubsDay3 from './../../public/assets/events-calendar/clubs-day3.json';
import eventsScheduleDay4 from './../../public/assets/events-calendar/events-day4.json';
import clubsDay4 from './../../public/assets/events-calendar/clubs-day4.json';


const events = [
    {
        id: 0,
        name: 'Academic and Professional Day',
        date: 'Mon, Aug 22',
        dateFull: 'Day 1 - Monday, August 22',
        description: `You can find information about club placements on the Instagram`,
        imgUrl: '/assets/day1.png',
        eventsSchedule: eventsScheduleDay1,
        clubsList: clubsDay1
    },
    {
        id: 1,
        name: 'Social Day',
        date: 'Tue, Aug 23',
        dateFull: 'Day 2 - Tuesday, August 23',
        description: `You can find information about club placements on the Instagram`,
        imgUrl: '/assets/day2.png',
        eventsSchedule: eventsScheduleDay2,
        clubsList: clubsDay2
    },
    {
        id: 2,
        name: 'Sports and Dance Day',
        date: 'Wed, Aug 24',
        dateFull: 'Day 3 - Wednesday, August 24',
        description: `You can find information about club placements on the Instagram`,
        imgUrl: '/assets/day4.png',
        eventsSchedule: eventsScheduleDay3,
        clubsList: clubsDay3
    },
    {
        id: 3,
        name: 'Art and Entertainment Day',
        date: 'Thu, Aug 25',
        dateFull: 'Day 4 - Thursday, August 25',
        description: `Event schedule wo be announced later`,
        imgUrl: '/assets/day3.png',
        eventsSchedule: eventsScheduleDay4,
        clubsList: clubsDay4
    },
    {
        id: 4,
        name: 'Student Government. Concert/Party',
        date: 'Fri, Aug 26',
        dateFull: 'Day 5 - Friday, August 26',
        description: `To be announced later`,
        imgUrl: '/assets/day5.png'
    }
]

const EventsCalendar: NextPage = () => {
    const [eventId, setEventId] = useState<number>(0);
    return (
        <DefaultLayout>
            <div className={styles.wrapper}>
                <section className={styles.eventSection}>
                    {
                        events.map((event) => event.id === eventId && (
                            <div key={event.id} className={styles.eventInfoWrapper}>
                                <EventInfo heading={event.name} subheading={event.dateFull}
                                           eventsSchedule={event.eventsSchedule}
                                           description={event.description}
                                           clubList={event.clubsList}/>
                            </div>
                        ))
                    }
                </section>
                <section className={styles.navSection}>
                    <div className={styles.navWrapper}>
                        <EventNavigation items={events} chosenId={eventId} onItemClick={(id) => setEventId(id)}/>
                    </div>
                </section>
            </div>

        </DefaultLayout>
    )
}

export default EventsCalendar

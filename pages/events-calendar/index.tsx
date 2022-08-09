import type { NextPage } from 'next'
import DefaultLayout from "../../layouts/default-layout";
import EventInfo from "../../components/event-info";
import EventNavigation from "../../components/event-navigation";

import styles from './../../styles/modules/EventCalendar.module.scss';
import {useMemo, useState} from "react";
import CarouselWithNavigation from "../../components/carousel-with-navigation";
import {useMediaQuery} from "@chakra-ui/react";

const events = [
    {
        id: 0,
        name: 'Academic and Professional Day',
        date: 'Mon, Aug 22',
        dateFull: 'Day 1 - Monday, August 22',
        description: `Bir bale anau mnau production Можно информацию про клубы`,
        imgUrl: '/assets/day1.jpg'
    },
    {
        id: 1,
        name: 'Social Day',
        date: 'Tue, Aug 23',
        dateFull: 'Day 2 - Tuesday, August 23',
        description: `Bir bale anau mnau production Можно информацию про клубы`,
        imgUrl: '/assets/day2.jpg'
    },
    {
        id: 2,
        name: 'Art and Entertainment Day',
        date: 'Wed, Aug 24',
        dateFull: 'Day 3 - Wednesday, August 24',
        description: `Bir bale anau mnau production Можно информацию про клубы`,
        imgUrl: '/assets/day3.jpg'
    },
    {
        id: 3,
        name: 'Sports and Dance Day',
        date: 'Wed, Aug 25',
        dateFull: 'Day 4 - Thursday, August 25',
        description: `Bir bale anau mnau production Можно информацию про клубы`,
        imgUrl: '/assets/day4.jpg'
    },
    {
        id: 4,
        name: 'Student Government. Concert/Party',
        date: 'Thu, Aug 26',
        dateFull: 'Day 5 - Friday, August 26',
        description: `Bir bale anau mnau production Можно информацию про клубы`,
        imgUrl: '/assets/day5.jpg'
    }
]

const EventsCalendar: NextPage = () => {
    const [eventId, setEventId] = useState<number>(0);
    const [isMobile] = useMediaQuery('(max-width: 1280px)');
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
                {
                    isMobile ? <CarouselWithNavigation
                        items={events.map(({id,imgUrl, date }) => ({
                            id,
                            imgUrl,
                            label: date
                        }))}
                        idActive={eventId}
                        onIdChange={(id) => setEventId(id)} /> : (
                            <EventNavigation items={events} chosenId={eventId} onItemClick={(id) => setEventId(id)} />
                    )
                }


            </section>
        </DefaultLayout>
    )
}

export default EventsCalendar

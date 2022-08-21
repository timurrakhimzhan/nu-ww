import {FormControl, FormLabel, Input, Select} from "@chakra-ui/react";
import React, {useMemo, useState} from "react";
import {EventProp} from "../../pages/moderator-panel";
import styles from './QrGenerator.module.scss';
import QrGeneratorForm from "../qr-generator-form";

type QrGeneratorProps = {
    events: Array<EventProp>;
}

const QrGenerator: React.FC<QrGeneratorProps> = ({events}) => {
    const [eventId, setEventId] = useState<number | undefined>(events.length === 1 ? events[0].id : undefined);
    const event = useMemo(() => events.find(({id}) => id === eventId), [eventId, events]);
    if(!events) {
        return null;
    }
    return <section className={styles.wrapper}>
        <FormControl>
            {events.length > 1 && <Select value={eventId}
                    onChange={(event) => setEventId(event.target.value ? Number(event.target.value) : undefined)}
                    borderRadius={'8px'} background={'whitesmoke'} name={'event'} placeholder={'Select event...'}
                    size={'sm'}>
                {
                    events.map(({id, name}) => <option value={id} key={id}>{name}</option>)
                }
            </Select>}
        </FormControl>
        {
            events.length === 1 && <h2 className={styles.heading}>Event: <b>{events[0].name}</b></h2>
        }
        {
            eventId && event && (
                <QrGeneratorForm
                    eventId={eventId}
                    minPoints={event.minPoints} maxPoints={event.maxPoints} />
            )
        }

    </section>
}

export default QrGenerator;
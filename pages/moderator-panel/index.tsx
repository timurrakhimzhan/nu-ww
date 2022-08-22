import DefaultLayout from "../../layouts/default-layout";
import {unstable_getServerSession} from "next-auth";
import NextAuth, {authOptions} from '../api/auth/[...nextauth]'
import prisma from "../../db/prisma";
import {Event} from '@prisma/client';
import React from "react";
import QrGenerator from "../../components/qr-generator";
import {Alert, AlertDescription, AlertIcon, Spinner} from "@chakra-ui/react";
import styles from './../../styles/modules/ModeratorPanel.module.scss';
import {useSnapshot} from "valtio";
import moderatorPanelStore from "../../utils/moderator-panel-store";
import QrDisplay from "../../components/qr-display";
import {ROLES} from "../../configs";

export type EventProp = Omit<Event, 'createdAt' | 'updatedAt' | 'isActive' | 'type' | 'isOver'>;

type ModeratorPanelProps = {
    events?: Array<EventProp>;
}

export async function getServerSideProps({req, res}: any){
    const session = await unstable_getServerSession(req, res, authOptions);
    if (session?.user.role !== ROLES.MODERATOR &&
        session?.user.role !== ROLES.PARTICIPANT_MODERATOR &&
        session?.user.role !== ROLES.TESTER
    ) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    const events: ModeratorPanelProps['events'] = await prisma.event.findMany({
        where: {
            isActive: true,
            isOver: false,
            EventModerators: {
                some: {
                    Moderator: {
                        email: session.user.email
                    }
                }
            }
        },
        select: {
            id: true,
            minPoints: true,
            maxPoints: true,
            name: true
        }
    });
    return {
        props: {
            events
        },
    }
}

const ModeratorPanel: React.FC<ModeratorPanelProps> = ({events}) => {
    const {mode} = useSnapshot(moderatorPanelStore);
    if(!events || events.length === 0) {
        return <DefaultLayout>
            <div className={styles.wrapper}>
                <Alert status={'error'}>
                    <AlertIcon />
                    <AlertDescription>
                        You have no events to moderate
                    </AlertDescription>
                </Alert>
            </div>

        </DefaultLayout>
    }
    return <DefaultLayout>
        <div className={styles.wrapper}>
            {mode === 'QR_NOT_GENERATED' ? <QrGenerator events={events}/> : <QrDisplay />}
        </div>
    </DefaultLayout>
}

export default ModeratorPanel;
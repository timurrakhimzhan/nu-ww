import React, {useEffect, useState} from "react";
import {useSnapshot} from "valtio";
import moderatorPanelStore from "../../utils/moderator-panel-store";
import QRCode from "react-qr-code"
import styles from './QrDisplay.module.scss';
import {Button, Spinner} from "@chakra-ui/react";
import {trpc} from "../../utils/trpc";
import {EventParticipationStatus} from "@prisma/client";

const QrDisplay = () => {
    const {hashInfo} = useSnapshot(moderatorPanelStore);
    const [fetching, setFetching] = useState(true);
    const {data} = trpc.useQuery(['moderator.get-token-moderator-info', { hash: hashInfo?.hash || ''}], {refetchInterval: 5000, enabled: fetching});
    const {mutateAsync: mutateCancel} = trpc.useMutation('moderator.cancel-token');
    const {mutateAsync: mutateAccept} = trpc.useMutation('moderator.accept-token');
    useEffect(() => {
        if (data?.scannedUser) {
            setFetching(false);
        }
    }, [data, setFetching])

    if(!hashInfo || !data) {
        return <div className={styles.wrapper}>
            <Spinner />
        </div>
    }

    return <div className={styles.wrapper}>
        <div className={styles.qrWrapper}>
            <QRCode value={`https://hello.world/qr-scanner?hash=${hashInfo.hash}`}/>
        </div>
        <div className={styles.info}>
            <div>Status: <b>{data.status}</b></div>
            {
                data.scannedUser && (
                    <>
                        <div>ID: <b>{data.scannedUser.id}</b></div>
                        <div>Email: <b>{data.scannedUser.email}</b></div>
                        <div>Full name: <b>{data.scannedUser.firstName} {data.scannedUser.lastName}</b></div>
                    </>
                )
            }
        </div>
        <div className={styles.buttonsWrapper}>
            <Button colorScheme='pink' onClick={() => mutateCancel({hash: hashInfo.hash}).then(() => moderatorPanelStore.reset())}>Cancel</Button>
            <Button colorScheme='teal' disabled={!data || data.status !== EventParticipationStatus.SCANNED}
                    onClick={() => mutateAccept({hash: hashInfo.hash}).then(() => moderatorPanelStore.reset())}>Accept</Button>
        </div>
    </div>
};

export default QrDisplay;
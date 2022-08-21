import DefaultLayout from "../../layouts/default-layout";
import {trpc} from "../../utils/trpc";
import {useEffect, useState} from "react";
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "../api/auth/[...nextauth]";
import {ROLES} from "../../configs";
import styles from '../../styles/modules/GetTokens.module.scss';
import QrScanner from "../../components/qr-scanner";
import {Alert, AlertIcon, Button} from "@chakra-ui/react";
import Cta from "../../components/cta";
import qrScanner from "../../components/qr-scanner";
import {useSnapshot} from "valtio";
import getTokensStore from "../../utils/getTokensStore";


export async function getServerSideProps({req, res}: any) {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (session?.user.role !== ROLES.PARTICIPANT &&
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
    return {
        props: {
        },
    }
}

export type QrScannerMode = 'QR_SCANNING' | 'QR_PROCESSED';

const GetTokens = () => {
    const {scannedHash, message, mode} = useSnapshot(getTokensStore);
    const {data: tokenData} = trpc.useQuery(['participant.get-token-participant-info', {hash: scannedHash || ''}], {enabled: !!scannedHash, refetchInterval: 5000});
    const utils = trpc.useContext();
    useEffect(() => {
        if(!tokenData) {
            return;
        }
        if(tokenData.status === 'SCAN_ACCEPTED') {
            getTokensStore.setSuccessMessage(`Congratulations. You received: ${tokenData.pointsAssigned} tokens`);

            utils.invalidateQueries(['leaderboard'])
            utils.invalidateQueries(['participant.leaderboard-info'])
        }
        if(tokenData.status === 'CANCELLED') {
            getTokensStore.setErrorMessage(`Your QR-code got cancelled. Try again.`);
        }
    }, [tokenData])

    return <DefaultLayout>
        <section className={styles.wrapper}>
            <h2 className={styles.heading}>Get tokens via QR:</h2>
            <div className={styles.actionWrapper}>
                {message && <Alert status={message.type}>
					<AlertIcon/>
                    {message.text}
				</Alert>}

                {mode === 'QR_PROCESSED' && <Cta label={'Scan another token'} size={'sm'} fullWidth
                                                 onClick={() => getTokensStore.reset()}/>
                }
            </div>
            {mode === 'QR_SCANNING' && <QrScanner />}
        </section>
    </DefaultLayout>
}

export default GetTokens;
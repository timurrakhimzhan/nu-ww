import {QrReader} from 'react-qr-reader';
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {trpc} from "../../utils/trpc";
import {Spinner} from "@chakra-ui/react";
import styles from './QrScanner.module.scss';
import {QrScannerMode} from "../../pages/get-tokens";
import getTokensStore from "../../utils/getTokensStore";
import {useSnapshot} from "valtio";



const QrScanner = () => {
    const router = useRouter();
    const hashFromUrl = router.query['hash'];
    const [hash, setHash] = useState<string>();
    const {mutateAsync, error, status: scanStatus, variables} = trpc.useMutation(['participant.scan-token'], {});

    useEffect(() => {
        if (!hashFromUrl || typeof hashFromUrl !== 'string') {
            return;
        }
        if (hashFromUrl) {
            setHash(hashFromUrl);
        }
    }, [hashFromUrl, mutateAsync]);

    useEffect(() => {
        if(!hash) {
            return;
        }
        mutateAsync({hash}).catch(err => console.error(err));
    }, [hash, mutateAsync])

    useEffect(() => {
        if (error) {
            getTokensStore.setErrorMessage(error.message);
            getTokensStore.setMode('QR_PROCESSED');
        }
    }, [error]);

    useEffect(() => {
        if (scanStatus === 'success') {
            getTokensStore.setLoadingMessage(`QR tokens successfully scanned, please wait for the approval`);
            if (variables?.hash) {
                getTokensStore.setScannedHash(variables.hash);
            }
        }
    }, [scanStatus, variables]);

    return <div className={styles.wrapper}>
        {
            scanStatus === 'loading' && (<Spinner color={'white'} size={'xl'} marginInline={'auto'}/>)
        }
        {
            scanStatus === 'idle' && (
                <QrReader
                    constraints={{}}
                    onResult={(result, error) => {
                        if (result) {
                            const text = result.getText();
                            const hashFromQR = text.split("hash=").at(-1);
                            if (hashFromQR) {
                                setHash(hashFromQR)
                            }
                        }
                    }}
                />
            )
        }

    </div>
}

export default QrScanner;
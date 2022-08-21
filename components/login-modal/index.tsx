import {Modal, ModalBody, ModalCloseButton, ModalContent} from "@chakra-ui/modal";
import styles from './LoginModal.module.scss';
import Image from 'next/image';
import React from "react";
import {signIn} from "next-auth/react"
import GoogleAuthButton from "../google-auth-button";
import {Alert, AlertIcon, Divider} from "@chakra-ui/react";

type LoginModalProps = {
    isOpen: boolean;
    onClose: () => void;
    errorMessage?: string;
}

const LoginModal: React.FC<LoginModalProps> = ({isOpen, onClose, errorMessage}) => {
    return <Modal colorScheme={'gray'} variant={'sm'} isOpen={isOpen} isCentered={true} onClose={onClose} motionPreset='slideInBottom'>
        <ModalContent width={'max-content'}>
            <ModalCloseButton/>
            <div className={styles.wrapper}>
                {errorMessage && (
                    <Alert status={'error'}>
                        <AlertIcon/>
                        {errorMessage}
                    </Alert>
                )}
                <Alert status={'warning'}>
                    <AlertIcon />
                    Use your @nu.edu.kz account
                </Alert>
                <div className={styles.googleButtonWrapper}>
                    <GoogleAuthButton/>
                </div>

            </div>
        </ModalContent>
    </Modal>
};

export default LoginModal;
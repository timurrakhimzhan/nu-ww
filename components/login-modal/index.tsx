import {Modal, ModalBody, ModalCloseButton, ModalContent} from "@chakra-ui/modal";
import styles from './LoginModal.module.scss';
import Image from 'next/image';
import React from "react";
import {signIn} from "next-auth/react"

type LoginModalProps = {
    isOpen: boolean;
    onClose: () => void;
    errorMessage?: string;
}

const LoginModal: React.FC<LoginModalProps> = ({isOpen, onClose, errorMessage}) => {
    return <Modal variant={'sm'} isOpen={isOpen} isCentered={true} onClose={onClose} motionPreset='slideInBottom'>
        <ModalContent width={'min-content'}>
            <ModalCloseButton/>
            <div className={styles.wrapper}>
                {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
                <button className={styles.button} onClick={() => signIn('google')}>
                    <div className={styles.googleIcon}>
                        <Image src={'/assets/google-logo.png'} width={'25'} height={'25'} alt={'google icon'}/>
                    </div>
                    <div>
                        Sign in with Google
                    </div>
                </button>
            </div>
        </ModalContent>
    </Modal>
};

export default LoginModal;
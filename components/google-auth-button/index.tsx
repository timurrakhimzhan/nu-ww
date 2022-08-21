import {signIn} from "next-auth/react";
import Image from "next/image";
import React from "react";
import styles from "./GoogleAuthButton.module.scss";

const GoogleAuthButton = () => {
    return <button className={styles.button} onClick={() => signIn('google')}>
        <div className={styles.googleIcon}>
            <Image src={'/assets/google-logo.png'} width={'25'} height={'25'} alt={'google icon'}/>
        </div>
        <div>
            Sign in with Google
        </div>
    </button>
}

export default GoogleAuthButton;
import Image from "next/image";
import React from "react";
import styles from './ContactUsButton.module.scss';

const ContactUsButton = () => {
    return <a className={styles.contactUsButton} href={'mailto:clubfair@nu.edu.kz'} target="_top">
        <span>Contact Us</span>
        <div className={styles.gmailLogoWrapper}>
            <Image src={'/assets/icons/gmail.svg'} alt={'gmail-logo'} width={'17'} height={'13'}/>
        </div>
    </a>
}

export default ContactUsButton;
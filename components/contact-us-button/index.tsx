import Image from "next/image";
import React from "react";
import styles from './ContactUsButton.module.scss';

const ContactUsButton = () => {
    return <button className={styles.contactUsButton}>
        <span>Contact Us</span>
        <a className={styles.gmailLogoWrapper} href={'mailto:clubfair@nu.edu.kz'}>
            <Image src={'/assets/icons/gmail.svg'} alt={'gmail-logo'} width={'17'} height={'13'}/>
        </a>
    </button>
}

export default ContactUsButton;
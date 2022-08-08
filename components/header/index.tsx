import React, {useState} from "react";
import Image from "next/image";
import { useRouter } from 'next/router'
import {
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    Drawer,
    DrawerCloseButton,
    DrawerHeader,
    Input
} from "@chakra-ui/react";

import styles from './Header.module.scss';
import {MENU} from "../../configs";
import Link from "next/link";

type HeaderProps = {
    onMenuIconClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuIconClick }) => {
    const router = useRouter();

    return <header className={styles.header}>
        <div className={styles.nuLogo}>
            <Image src={'/assets/nu-logo.png'} alt={'Nazarbayev University Logo'} width={'224'} height={'86'} />
        </div>
        <button className={styles.menuIconWrapper} onClick={onMenuIconClick}>
            <Image src={'/assets/icons/menu.svg'} alt={'Open menu'} width={'25'} height={'25'} />
        </button>
        <menu className={styles.itemsWrapper}>
            {MENU.map(({label, path}) => (
                <li key={path} role={'menuitem'} data-selected={router.route === path}>
                    <Link href={path}>
                        <a>{label}</a>
                    </Link>
                </li>
            ))}
        </menu>
        <div className={styles.contactsWrapper}>
            <button className={styles.contactUsButton}>
                <span>Contact Us</span>
                <div className={styles.gmailLogoWrapper}>
                    <Image src={'/assets/icons/gmail.svg'} alt={'gmail-logo'} width={'17'} height={'13'} />
                </div>
            </button>
            <a className={styles.instagramWrapper}>
                <Image src={'/assets/icons/inst.svg'} alt={'instagram-logo'} width={'30'} height={'30'} />
            </a>
        </div>
    </header>
}

export default Header;
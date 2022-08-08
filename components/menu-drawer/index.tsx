import React from "react";
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Input
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import {MENU} from "../../configs";

import styles from './MenuDrawer.module.scss';
import {useRouter} from "next/router";

type MenuDrawerProps = {
    isOpen: boolean;
    onCLose: () => void;
}

const MenuDrawer: React.FC<MenuDrawerProps> = ({isOpen, onCLose}) => {
    const router = useRouter();

    return <Drawer size={'md'} isOpen={isOpen} placement={'left'} onClose={onCLose}>
        <DrawerOverlay />
        <DrawerContent background={'var(--menu-drawer-background)'}>
            <DrawerCloseButton color={'var(--color-white)'} />
            <DrawerHeader>
                <Image src={'/assets/nu-logo.png'} alt={'Nazarbayev University Logo'} width={'224'} height={'86'} />
            </DrawerHeader>
            <DrawerBody>
                <menu className={styles.itemsWrapper}>
                    {MENU.map(({label, path, iconPath}) => (
                        <li key={path} role={'menuitem'} data-selected={router.route === path}>
                            <Link href={path}>
                                <a>
                                    <Image src={iconPath} width={'25'} height={'25'} alt={'menu-icon'} />
                                    {label}
                                </a>
                            </Link>
                        </li>
                    ))}

                </menu>
            </DrawerBody>
        </DrawerContent>
    </Drawer>
}

export default MenuDrawer;
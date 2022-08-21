import React, {useEffect, useState} from "react";
import Image from "next/image";
import { useRouter } from 'next/router'

import styles from './Header.module.scss';
import {MENU, ROLES} from "../../configs";
import Link from "next/link";
import LoginModal from "../login-modal";
import {signOut, useSession} from "next-auth/react";
import {
    Menu,
    MenuButton, MenuDivider,
    MenuItem, MenuItemOption,
    MenuList, MenuOptionGroup,
    Popover,
    PopoverAnchor,
    PopoverContent,
    PopoverTrigger
} from "@chakra-ui/react";
import {trpc} from "../../utils/trpc";
import ContactUsButton from "../contact-us-button";

type HeaderProps = {
    onMenuIconClick: () => void;
}

export async function getServerSideProps() {
    return {
        props: {
            isAdmin: true
        }, // will be passed to the page component as props
    }
}


const Header: React.FC<HeaderProps> = ({ onMenuIconClick, ... props }) => {
    const router = useRouter();
    const isLoggingIn = router.query['mode'] === 'login';
    const errorMessage = typeof router.query['error'] === 'string' ? router.query['error'] : undefined;
    const [isModalOpened, setIsModalOpened] = useState(false);
    const {status, data} = useSession();
    const {data: leaderboardData} = trpc.useQuery(['participant.leaderboard-info'], {
        enabled: data?.user.role === ROLES.PARTICIPANT || data?.user.role === ROLES.PARTICIPANT_MODERATOR
    });

    const pointsString = leaderboardData ? `${leaderboardData.points}/${leaderboardData.maxPoints} tokens` : '';

    useEffect(() => {
        if(isLoggingIn) {
            setIsModalOpened(true);
        }
    }, [isLoggingIn, setIsModalOpened])

    return <>
        <header className={styles.header}>
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
            <div className={styles.contactUsButtonWrapper}><ContactUsButton /></div>
            <a className={styles.iconWrapper}>
                <Image src={'/assets/icons/inst.svg'} alt={'instagram-logo'} width={'30'} height={'30'} />
            </a>
            {
                status === 'unauthenticated' && (
                    <button className={styles.iconWrapper} onClick={() => setIsModalOpened(true)}>
                        <Image src={'/assets/icons/login.svg'} alt={'login-icon'} width={'34'} height={'34'}/>
                    </button>
                )
            }

            {
                status === 'authenticated' && data && (
                    <Menu>
                        <MenuButton>
                            <div className={styles.iconWrapper}>
                                <Image src={'/assets/icons/profile.svg'} alt={'profile-icon'} width={'34'} height={'34'}/>
                            </div>
                        </MenuButton>

                        <MenuList>
                            <MenuOptionGroup title={`${data.user.firstName} ${data.user.lastName} ${pointsString}`}>
                                {(data.user.role === ROLES.PARTICIPANT || data.user.role === ROLES.PARTICIPANT_MODERATOR) && (
                                    <MenuItemOption onClick={() => router.push('/get-tokens')}>
                                        Get tokens
                                    </MenuItemOption>
                                )}
                                {(data.user.role === ROLES.MODERATOR || data.user.role === ROLES.PARTICIPANT_MODERATOR) && (
                                    <MenuItemOption onClick={() => router.push('/moderator-panel')}>
                                        Moderate
                                    </MenuItemOption>
                                )}
                                <MenuItemOption onClick={() => signOut()}>Log out</MenuItemOption>
                            </MenuOptionGroup>

                        </MenuList>
                    </Menu>
                )
            }

        </div>
    </header>
        {status === 'unauthenticated' && <LoginModal
            isOpen={isModalOpened}
            onClose={() => {
                setIsModalOpened(false);
                const {pathname} = router;
                router.replace({pathname, query: ''}, undefined, {shallow: true})
            }}
            errorMessage={errorMessage}
        />}

    </>
}

export default Header;
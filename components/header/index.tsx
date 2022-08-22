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
import GoogleAuthButton from "../google-auth-button";
import useCanModerate from "../../hooks/useCanModerate";
import useCanParticipate from "../../hooks/useCanParticipate";
import useShownInLeaderboard from "../../hooks/useShownInLeaderboard";

type HeaderProps = {
    onMenuIconClick: () => void;
}


const Header: React.FC<HeaderProps> = ({ onMenuIconClick }) => {
    const router = useRouter();
    const isLoggingIn = router.query['mode'] === 'login';
    const errorMessage = typeof router.query['error'] === 'string' ? router.query['error'] : undefined;
    const [isModalOpened, setIsModalOpened] = useState(false);
    const {status, data} = useSession();
    const canModerate = useCanModerate();
    const canParticipate = useCanParticipate();
    const shownInLeaderboard = useShownInLeaderboard();
    const {data: leaderboardData} = trpc.useQuery(['participant.leaderboard-info'], {
        enabled: shownInLeaderboard
    });

    const pointsString = leaderboardData ? `${leaderboardData.points}/${leaderboardData.maxPoints} tokens` : '';
    const rankString = leaderboardData?.rank ? `#${leaderboardData?.rank}` : ''

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
            <a href={'https://www.instagram.com/nuclubfair2022/'} target={'_blank'} rel={'noreferrer'} className={styles.iconWrapper}>
                <Image src={'/assets/icons/inst.svg'} alt={'instagram-logo'} width={'30'} height={'30'} />
            </a>
            {
                status === 'unauthenticated' && (
                    <button className={styles.iconWrapper} onClick={() => setIsModalOpened(true)}>
                        <Image src={'/assets/icons/login.svg'} alt={'login-icon'} width={'34'}
                               height={'34'}/>
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
                            <MenuOptionGroup title={`${rankString} ${data.user.firstName} ${data.user.lastName} ${pointsString}`}>
                                {(canParticipate) && (
                                    <MenuItem onClick={() => router.push('/get-tokens')}>
                                        <div className={styles.menuItemWrapper}>Get tokens</div>
                                    </MenuItem>
                                )}
                                {(canModerate) && (
                                    <MenuItem onClick={() => router.push('/moderator-panel')}>
                                        <div className={styles.menuItemWrapper}>Moderate</div>
                                    </MenuItem>
                                )}
                                <MenuItem onClick={() => signOut()} className={styles.menuItemWrapper}>
                                    <div className={styles.menuItemWrapper}>Log out</div>
                                </MenuItem>
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
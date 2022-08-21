import Header from "../header";
import React, {useEffect, useState} from "react";
import MenuDrawer from "../menu-drawer";

import styles from './Hero.module.scss';
import HeroInfo from "../hero-info";
import CarouselWithNavigation from "../carousel-with-navigation";
import ContentLayout from "../../layouts/content-layout";

const       Hero = () => {
    const carousel = [
        { id: 0, imgUrl: '/assets/paintings.jpeg', label: <div><p>Paintings</p></div> },
        { id: 1, imgUrl: '/assets/nu-bg.jpg', label: <div><p>NU bg</p></div> }
    ];

    const [idActive, setIdActive] = useState(0);
    const [isDrawerMenuOpen, setIsDrawerMenuOpen] = useState(false);

    return <div className={styles.layout}>
        <Header onMenuIconClick={() => setIsDrawerMenuOpen(true)} />
        <MenuDrawer isOpen={isDrawerMenuOpen} onCLose={() => setIsDrawerMenuOpen(false)} />
        <ContentLayout>
            <div className={styles.content}>
                <div className={styles.clubInfoWrapper}>
                    <HeroInfo />
                </div>
                <div className={styles.carouselWrapper}>
                    <div className={styles.iframeWrapper}>
                        <div>
                            <iframe src="https://www.youtube.com/embed/p26AC5ZP-Xs?autoplay=1"
                                    title="YouTube video player" frameBorder="0"
                                    allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen></iframe>
                        </div>
                    </div>

                </div>
            </div>
        </ContentLayout>

    </div>
}

export default Hero;
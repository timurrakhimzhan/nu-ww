import ContentLayout from "../../layouts/content-layout";
import styles from './Footer.module.scss';
import SponsorItem from "../sponsor-item";

const sponsors = [
    {
        "name": "Student Budget Fund",
        "imageUrl": "/assets/sponsors/SBC.png",
        "description": "Student Budget Fund - the SFBC is an independent branch of Student Government (hereinafter - SG) at Nazarbayev University. The committee allocates approximately 61 million tenge contained in the Student Fund in consultation with the Nazarbayev Universnfrity Department of Student Services (hereinafter – DSS)."
    },
    {
        "name": "6inch",
        "imageUrl": "/assets/sponsors/6inch.png",
        "description": "6inch - is a fast food cafe with a concept built around the \"assemble it yourself\" system. Here, you can have a healthy and individually built snack quickly."
    },
    {
        "name": "Daily Сup",
        "imageUrl": "/assets/sponsors/DailyCup.png",
        "description": "Daily Сup - espresso and brew bar. “A place where every morning is good.”"
    },
    {
        "name": "La Tartine",
        "imageUrl": "/assets/sponsors/LaTartine.png",
        "description": "La Tartine - a cozy and hospitable French bakery where you can refresh yourself throughout the day."
    },
    {
        "name": "Everest",
        "imageUrl": "/assets/sponsors/Everest.png",
        "description": "Everest - volleyball club in Astana."
    },
    {
        "name": "A4",
        "imageUrl": "/assets/sponsors/A4.png",
        "description": "A4 - a stationery store on the territory of NU."
    },
    {
        "name": "Bodrii den",
        "imageUrl": "/assets/sponsors/BodriiDen.png",
        "description": "Бодрый день - an international chain of cheerful coffee shops."
    },
    {
        "name": "L'amitie",
        "imageUrl": "/assets/sponsors/Lamitie.png",
        "description": "L'amitie - a new french cafe on the territory of NU."
    },
    {
        "name": "Kunde",
        "imageUrl": "/assets/sponsors/Kunde.png",
        "description": "Kunde - is a nice place where people with special needs serve you delicious food and beverages."
    },
    {
        "name": "Steppe Dunk",
        "imageUrl": "/assets/sponsors/SteppeDunk.png",
        "description": "Steppe Dunk - a basketball school and section in Astana (Nur-Sultan)."
    },
    {
        "name": "DC Lab",
        "imageUrl": "/assets/sponsors/DCLab.png",
        "description": "DC Lab - first coworking space in Astana for designers, digital artists, video-makers and photographers."
    }
]

const Footer = () => {
    return <footer className={styles.footer}>
        <ContentLayout>
            <div className={styles.content}>
                <div className={styles.headingsWrapper}>
                    <h1 className={styles.heading}>
                        Club fair
                    </h1>
                    <h3 className={styles.subheading}>
                        Sponsors
                    </h3>
                </div>
                <div className={styles.sponsorsWrapper}>
                    {
                        sponsors.map((item) => (
                            <div className={styles.sponsorWrapper} key={item.name}>
                                <SponsorItem imageUrl={item.imageUrl} description={item.description}
                                             name={item.name}/>
                            </div>
                        ))
                    }
                </div>
            </div>
        </ContentLayout>
    </footer>
}

export default Footer;
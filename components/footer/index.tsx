import ContentLayout from "../../layouts/content-layout";
import styles from './Footer.module.scss';
import Image from 'next/image'

const Footer = () => {
    return <footer className={styles.footer}>
        <ContentLayout>
            <div className={styles.content}>
                <div className={styles.headingsWrapper}>
                    <h1 className={styles.heading}>
                        Nazarbayev University
                    </h1>
                    <h3 className={styles.subheading}>
                        Welcome Week
                    </h3>
                </div>
                <div className={styles.socialMediaWrapper}>
                    <div className={styles.socialMediaIconWrapper}>
                        <Image src={'/assets/icons/whatsapp-footer.svg'} layout="fill" objectFit="cover" alt={'Whatsapp logo'} />
                    </div>
                    <div className={styles.socialMediaIconWrapper}>
                        <Image src={'/assets/icons/instagram-footer.svg'} layout="fill" objectFit="cover" alt={'Instagram logo'} />
                    </div>
                    <div className={styles.socialMediaIconWrapper}>
                        <Image src={'/assets/icons/facebook-footer.svg'} layout="fill" objectFit="cover" alt={'Facebook logo'} />
                    </div>
                </div>
            </div>
        </ContentLayout>
    </footer>
}

export default Footer;
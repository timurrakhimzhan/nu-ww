import styles from './HeroInfo.module.scss';
import {Image} from "@chakra-ui/image";
import ArrowRightSvg from "../arrow-right-svg/ArrowRightSvg";

const HeroInfo = () => {
    return <div className={styles.wrapper}>
        <div className={styles.headingWrapper}>
            <h1 className={styles.heading}>
                Club <span className={styles.primary}>Fair</span>
            </h1>
            <Image src={'/assets/icons/club-fair.svg'} width={'106'} height={'85'} alt={'Club fair logo'} />
        </div>
        <p className={styles.description}>
            Club Fair is organized to help new students get into
            university life and get acknowledged with variety of
            Student Clubs in different fields: Academic and Professional,
            Social, Art and Entertainment, Sport and Dance, Student Government.
        </p>
        <button className={styles.cta}>
            <span>Go to events</span>
            <ArrowRightSvg fill={'url(#paint0_linear_573_150)'} />
        </button>
    </div>
}

export default HeroInfo;
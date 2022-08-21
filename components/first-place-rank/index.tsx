import React from "react";
import styles from './FirstPlaceRank.module.scss';


type FirstPlaceRankProps = {
    firstName: string;
    lastName: string;
    points: number;
    maxPoints: number;
}

const FirstPlaceRank: React.FC<FirstPlaceRankProps> = ({firstName, lastName, points, maxPoints}) => {
    return <div className={styles.firstPlace}>
        <div className={styles.firstPlacePlacingAndInfo}>
            <div className={styles.firstPlacePlacing}>#1</div>
            <div className={styles.firstPlaceInfo}>
                <div className={styles.name}>{firstName} {lastName}</div>
            </div>
        </div>
        <div className={styles.firstPlacePoints}>{points}/{maxPoints}</div>
    </div>
}

export default FirstPlaceRank;
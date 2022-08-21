import React from "react";
import styles from './RankingItem.module.scss';
import {capitalize} from "../../utils/capitalize";
import {useMediaQuery} from "@chakra-ui/react";

type RankingItemProps = {
    rank: number;
    firstName: string;
    lastName: string;
    points: number;
    maxPoints: number
}

const RankingItem: React.FC<RankingItemProps> = ({rank, firstName, lastName, points, maxPoints}) => {
    const [isMobile] = useMediaQuery('(max-width: 1280px)');

    return <>
        <div className={styles.cell}>#{rank}</div>
        {
            isMobile ? (<div className={styles.cell}>
                <div>{capitalize(firstName)}</div>
                <div>{capitalize(lastName)}</div>
            </div>) : (
                <>
                    <div className={styles.cell}>{capitalize(firstName)}</div>
                    <div className={styles.cell}>{capitalize(lastName)}</div>
                </>
            )
        }
        <div className={styles.cell}>{points}/{maxPoints}</div>
    </>
}

export default RankingItem;
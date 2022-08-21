import React from "react";
import styles from './ClubsList.module.scss';

type ClubsListProps = {
    clubs: Array<string>;
}

const ClubsList: React.FC<ClubsListProps> = ({clubs}) => {
    return <div className={styles.wrapper}>
        {
            clubs.map((club) => <React.Fragment key={club}>
                <div>{club}</div>
                <div>•</div>
            </React.Fragment>)
        }
    </div>
}

export default ClubsList;

import React, {useEffect, useLayoutEffect, useRef} from "react";
import styles from './ClubsList.module.scss';

type ClubsListProps = {
    clubs: Array<string>;
}

const ClubsList: React.FC<ClubsListProps> = ({clubs}) => {
    return <div className={styles.wrapper}>
        {
            clubs.map((club) => <div key={club} className={'club-list-item'}>{club}</div>
            )
        }
    </div>
}

export default ClubsList;

import styles from './ClubInfo.module.scss';

const ClubInfo = () => {
    return <div className={styles.wrapper}>
            <div className={styles.infoWrapper}>
                <h3 className={styles.heading}>
                    What is Club Fair?
                </h3>
                <div className={styles.description}>
                    Club Fair  is a huge event at Nazarbayev University.
                    Hundreds of student organizations, campus departments, and even local businesses gather
                    together on Main Atrium to help students get
                    connected at NU. The event is held  in beginning of
                    the academic year. This fall, Club Fair will be held on Monayd-Friday, August 22-26.
                </div>
            </div>
            <div className={styles.imageWrapper}>
                <div className={styles.imageDiv} />
            </div>
        </div>
}

export default ClubInfo;
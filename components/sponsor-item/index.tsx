import styles from './SponsorItem.module.scss';
import React from "react";
import Image from "next/image";

type SponsorItemProps = {
    imageUrl: string;
    description: string;
    name: string;
}

const SponsorItem: React.FC<SponsorItemProps> = ({name, description, imageUrl}) => {
    return <div className={styles.wrapper}>
        <div className={styles.imageWrapper}>
            <Image src={imageUrl} layout={'fill'} alt={name} objectFit='contain'/>
        </div>
        <div className={styles.description}>
            {description}
        </div>
    </div>
};

export default SponsorItem;
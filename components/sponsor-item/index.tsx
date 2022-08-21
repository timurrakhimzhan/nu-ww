import styles from './SponsorItem.module.scss';
import React from "react";
import {Image} from "@chakra-ui/image";

type SponsorItemProps = {
    imageUrl: string;
    description: string;
    name: string;
}

const SponsorItem: React.FC<SponsorItemProps> = ({name, description, imageUrl}) => {
    return <div className={styles.wrapper}>
        <img src={imageUrl} alt={name}/>
        <div className={styles.description}>
            {description}
        </div>
    </div>
};

export default SponsorItem;
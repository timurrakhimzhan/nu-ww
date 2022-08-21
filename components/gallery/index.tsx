import styles from './Gallery.module.scss';
import ContentLayout from "../../layouts/content-layout";
import {Image} from "@chakra-ui/image";

const Gallery = () => {
    return <div className={styles.wrapper}>
        <ContentLayout>
            <div className={styles.content}>
                <h3 className={styles.heading}>
                    Gallery
                </h3>
                <div className={styles.galleryPhotos}>
                    {
                        Array.from(Array(27).keys())
                            .map((i) => i + 1)
                            .map((i) => (
                                <div key={i} className={styles.galleryPhoto} style={{backgroundImage: `url(/assets/gallery/${i}.png)`}} />
                            ))
                    }
                </div>
            </div>

        </ContentLayout>
    </div>
}

export default Gallery;
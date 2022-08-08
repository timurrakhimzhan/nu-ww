import styles from './Gallery.module.scss';
import ContentLayout from "../../layouts/content-layout";

const Gallery = () => {
    return <div className={styles.wrapper}>
        <ContentLayout>
            <div className={styles.content}>
                <h3 className={styles.heading}>
                    Gallery
                </h3>
                <div className={styles.galleryPhotos}>
                    <div className={styles.galleryPhoto} />
                    <div className={styles.galleryPhoto} />
                    <div className={styles.galleryPhoto} />
                    <div className={styles.galleryPhoto} />
                    <div className={styles.galleryPhoto} />
                    <div className={styles.galleryPhoto} />
                    <div className={styles.galleryPhoto} />
                    <div className={styles.galleryPhoto} />
                    <div className={styles.galleryPhoto} />
                    <div className={styles.galleryPhoto} />
                    <div className={styles.galleryPhoto} />
                </div>
            </div>

        </ContentLayout>
    </div>
}

export default Gallery;
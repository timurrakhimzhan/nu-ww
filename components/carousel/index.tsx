import styles from './Carousel.module.scss';
import React from "react";

export type CarouselProps = {
    items: Array<{
        id: number;
        imgUrl: string;
        label: React.ReactElement;
    }>
    idActive: number;
    onIdChange: (id: number) => void;
}

const Carousel: React.FC<CarouselProps> = ({ idActive, items, onIdChange}) => {
    return <div className={styles.content}>
        <div className={styles.slideWrapper} style={{
            transform: `translateX(-${100 * idActive}%)`
        }}>
            {
                items.map((item, i) => (
                    <div className={styles.item} key={item.id} style={{
                        backgroundImage: `url(${item.imgUrl})`,
                        transform: `translateX(${100 * i}%)`
                    }} />
                ))
            }
        </div>
        <div className={styles.slideWrapper}  style={{
            transform: `translateX(-${100 * idActive}%)`
        }}>
            {
                items.map((item, i) => (
                    <div key={item.id} className={styles.item} style={{
                        transform: `translateX(${100 * i}%)`
                    }}>
                        {item.label}
                    </div>
                ))
            }
        </div>
    </div>
}

export default Carousel;
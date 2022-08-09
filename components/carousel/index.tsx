import styles from './Carousel.module.scss';
import React from "react";
import Image from 'next/image';
import {useSwipeable} from "react-swipeable";

export type CarouselProps = {
    items: Array<{
        id: number;
        imgUrl: string;
        label: string;
    }>
    idActive: number;
    onIdChange: (id: number) => void;
}

const Carousel: React.FC<CarouselProps> = ({ idActive, items, onIdChange}) => {
    const handlers = useSwipeable({
        onSwiped: (eventData) => {
            if(eventData.dir === 'Left' && idActive + 1 < items.length) {
                onIdChange(idActive + 1);
            }
            if(eventData.dir === 'Right' && idActive - 1 >= 0) {
                onIdChange(idActive - 1);
            }
        },
    });
    return <div className={styles.content} {...handlers}>
        <div className={styles.slideWrapper} style={{
            transform: `translateX(-${100 * idActive}%)`
        }}>
            {
                items.map((item, i) => (
                    <div className={styles.item} key={item.id} style={{
                        transform: `translateX(${100 * i}%)`
                    }}>
                        <Image src={item.imgUrl} alt={`Carousel ${i} item`} objectFit={'cover'} layout={'fill'} />
                        <p className={styles.itemLabel}>{item.label}</p>
                    </div>
                ))
            }
        </div>
    </div>
}

export default Carousel;
import Carousel, {CarouselProps} from "../carousel";
import React from "react";

import styles from './CarouselWithNavigation.module.scss';
import ArrowRightSvg from "../arrow-right-svg/ArrowRightSvg";
import clsx from "clsx";

type CarouselWithNavigationProps = CarouselProps & {
    showProgress?: boolean;
};

const CarouselWithNavigation: React.FC<CarouselWithNavigationProps>  = ({items, idActive, onIdChange, showProgress}) => {
    return <div className={styles.wrapper}>
        <div className={styles.contentWrapper}>
            <button onClick={() => onIdChange(idActive - 1)}
                    className={clsx(styles.arrowIcon, styles.arrowLeft, idActive === 0 && styles.arrowDisabled)}>
                <ArrowRightSvg />
            </button>
            <div>
                <Carousel items={items} idActive={idActive} onIdChange={onIdChange} />
            </div>
            <button onClick={() => onIdChange(idActive + 1)}
                    className={clsx(styles.arrowIcon, idActive + 1 === items.length && styles.arrowDisabled)}>
                <ArrowRightSvg />
            </button>
        </div>
        {showProgress && <div className={styles.progressWrapper}>
            {items.map(({id}) => (<div key={id} className={clsx(styles.progressDisplayer, id === idActive && styles.active)} />))}
        </div>}
    </div>
}

export default CarouselWithNavigation;
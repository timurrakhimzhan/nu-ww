import React, {useEffect, useLayoutEffect, useRef} from "react";
import styles from './ClubsList.module.scss';

type ClubsListProps = {
    clubs: Array<string>;
}

const resizeHandlerGenerator = (elements: Array<HTMLDivElement | null>) => () => {
    elements.forEach((elem, i) => {
        if(!elem) {
            return;
        }
        if(i % 2 === 0) {
            return;
        }
        const prevElem = elements[i - 1];
        const nextElem = elements[i + 1];
        elem.style.visibility = 'visible'
        if(!prevElem || prevElem.offsetTop < elem.offsetTop) {
            elem.style.visibility = 'hidden';
            return;
        }
        if (!nextElem || nextElem.offsetTop > elem.offsetTop) {
            elem.style.visibility = 'hidden';
            return;
        }
    })
}

const ClubsList: React.FC<ClubsListProps> = ({clubs}) => {
    const refs = useRef<Array<HTMLDivElement | null>>([...clubs, ...clubs].map(() => null));
    useLayoutEffect(() => {
        if(refs.current) {
            const handler = resizeHandlerGenerator(refs.current);
            handler();
            window.addEventListener('resize', handler);
            return () => window.removeEventListener('resize', handler)
        }
    }, [])
    return <div className={styles.wrapper}>
        {
            clubs.map((club, i) => <React.Fragment key={club}>
                <div ref={(el) => refs.current[i * 2] = el} id={`${i * 2}`}>{club}</div>
                <div ref={(el) => refs.current[i * 2 + 1] = el} id={`${i * 2 + 1}`}>•</div>
            </ React.Fragment>
            )
        }
    </div>
}

export default ClubsList;

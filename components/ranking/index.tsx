import styles from './Ranking.module.scss';
import FirstPlaceRank from "../first-place-rank";
import RankingItem from "../ranking-item";
import {trpc} from "../../utils/trpc";
import {Spinner} from "@chakra-ui/react";
import {useRef} from "react";

const Ranking = () => {
    const scrollElemRef = useRef<HTMLDivElement>(null);
    const {data, isFetchingNextPage, hasNextPage, fetchNextPage} = trpc.useInfiniteQuery(['leaderboard', {limit: 20}], {
        refetchOnMount: true,
        getNextPageParam(lastPage) {
            if(lastPage.cursor * lastPage.limit >= lastPage.total) {
                return undefined;
            }
            return lastPage.cursor + 1
        },

    });

    return <div className={styles.wrapper}>
        {!data ? <Spinner color={'white'} size={'xl'} marginInline={'auto'} marginBlock={'24px'} /> : (
            <>
                <FirstPlaceRank firstName={data.pages[0].items[0].firstName}
                                lastName={data.pages[0].items[0].lastName}
                                points={data.pages[0].items[0].points}
                                maxPoints={data.pages[0].maxPoints}
                />
                <div className={styles.notFirstPlacesWrapper} ref={scrollElemRef}>
                    {
                        data.pages.map((page, i) => (
                            page.items.filter((_, j) => i !== 0 || j !== 0).map((participant) => (
                                <RankingItem key={participant.rank} {...participant} maxPoints={page.maxPoints}/>
                            ))
                        ))
                    }
                    <div className={styles.actionWrapper}>
                        {isFetchingNextPage && <Spinner color={'white'} size={'xl'}/>}
                        {!isFetchingNextPage && hasNextPage && <span onClick={() => {
                            fetchNextPage()
                        }}>Load more</span>}
                    </div>
                </div>
            </>
        )}


    </div>
}

export default Ranking;
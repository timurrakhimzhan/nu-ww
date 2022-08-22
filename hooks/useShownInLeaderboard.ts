import {useSession} from "next-auth/react";
import {ROLES} from "../configs";

const useShownInLeaderboard = () => {
    const {data} = useSession();

    if (!data) {
        return false
    }
    return data.user.role === ROLES.PARTICIPANT || data.user.role === ROLES.PARTICIPANT_MODERATOR;
}

export default useShownInLeaderboard;
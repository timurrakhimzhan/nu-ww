import {useSession} from "next-auth/react";
import {ROLES} from "../configs";

const useCanModerate = () => {
    const {data} = useSession();

    if(!data) {
        return false
    }
    return data.user.role === ROLES.MODERATOR || data.user.role === ROLES.PARTICIPANT_MODERATOR || data.user.role === ROLES.TESTER
}

export default useCanModerate;
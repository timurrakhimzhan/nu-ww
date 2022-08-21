import {proxy} from "valtio";
import {EventParticipationStatus} from "@prisma/client";
import {z} from 'zod';
import {scannedUserSchema} from "../types/schemas";

type ScannedUserInfo = z.infer<typeof scannedUserSchema>;
type HashInfo = {
    hash: string;
    status: EventParticipationStatus;
    pointsAssigned: number;
}

class ModeratorPanelStore {
    private _hashInfo: HashInfo | undefined;
    private _mode: 'QR_NOT_GENERATED' | 'QR_GENERATED' = 'QR_NOT_GENERATED';
    private _scannedUser: ScannedUserInfo;

    get hashInfo() {
        return this._hashInfo;
    }

    get mode() {
        return this._mode;
    }

    get scannedUser() {
        return this._scannedUser;
    }

    setHashInfo(hashInfo: HashInfo) {
        this._mode = 'QR_GENERATED';
        this._hashInfo = hashInfo;
    }

    setScannedUser(user: ScannedUserInfo) {
        this._scannedUser = user;
    }

    reset() {
        this._mode = 'QR_NOT_GENERATED';
        this._hashInfo = undefined;
        this._scannedUser = undefined;
    }
}

const moderatorPanelStore = proxy(new ModeratorPanelStore());

export default moderatorPanelStore;
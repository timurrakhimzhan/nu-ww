import {proxy} from "valtio";

type Message = { type: 'error' | 'success' | 'loading', text: string }
type Mode = 'QR_SCANNING' | 'QR_PROCESSED';

class GetTokensStore {
    private _message: Message | null = null;
    private _mode: Mode = 'QR_SCANNING';
    private _scannedHash: string | undefined = undefined;

    get message() {
        return this._message
    }

    get mode() {
        return this._mode
    }

    get scannedHash() {
        return this._scannedHash;
    }

    setErrorMessage(errorMessage: string) {
        this._message = { type: 'error', text: errorMessage}
    }

    setMode(mode: Mode) {
        this._mode = mode;
    }

    setScannedHash(hash: string) {
        this._mode = 'QR_PROCESSED';
        this._scannedHash = hash;
    }

    setSuccessMessage(text: string) {
        this._message = { type: 'success', text }
    }

    setLoadingMessage(text: string) {
        this._message = {type: 'loading', text}
    }

    reset() {
        this._mode = 'QR_SCANNING';
        this._scannedHash = undefined;
        this._message = null;
    }
}

const getTokensStore = proxy(new GetTokensStore());

export default getTokensStore;

import { atom } from "recoil";
import { auth } from "../types/auth";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()


const defaultAuth : auth = {
    token: null,
    refreshToken: null,
    role: null,
    isLogged: false,
}

export const authState = atom({
    key: 'authAtom', // unique ID (with respect to other atoms/selectors)
    default: defaultAuth,
    effects_UNSTABLE: [persistAtom],
});
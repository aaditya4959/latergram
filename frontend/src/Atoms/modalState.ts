import { atom } from "recoil"

export const modalState = atom({
    key: 'modalState',
    default: false,  // initial state of the key
})
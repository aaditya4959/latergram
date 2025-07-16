import { create } from "zustand";


interface LoadState {
    isLoading: boolean;
    setLoading:(loading:boolean) => void;
}



export const useLoadStore = create<LoadState>((set)=> ({
    isLoading: false,
    setLoading: (loading) => set({ isLoading: loading }),
}))
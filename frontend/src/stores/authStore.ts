import { create} from "zustand"

interface AuthState {
    isAuthenticated: boolean;
    user: any;
    signIn: (user: any) => void;
    signOut: () => void;

}


export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  signIn: (user) => set({ isAuthenticated: true, user }),
  signOut: () => set({ isAuthenticated: false, user: null }),
}));
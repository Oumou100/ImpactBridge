import { create } from "zustand";
import Cookies from "js-cookie";

interface AuthState {
    token: string | null;
    customerId: string | null;
    isUserLoggedIn: boolean | null;

    setToken: (token: string) => void;
    clearToken: () => void;
    setCustomerId: (customerId: string) => void;
    setIsUserLoggedIn: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => {
    const token =
        typeof window !== "undefined" ? Cookies.get("authToken") || null : null;

    const customerId =
        typeof window !== "undefined" ? Cookies.get("customerId") || null : null;

    return {
        token,
        customerId,
        isUserLoggedIn: null,

        setToken: (token) => {
            if (typeof window !== "undefined") {
                Cookies.set("authToken", token, { expires: 1 });
            }
            set({ token });
        },

        setCustomerId: (customerId) => {
            if (typeof window !== "undefined") {
                Cookies.set("customerId", customerId, { expires: 1 });
            }
            set({ customerId });
        },

        clearToken: () => {
            if (typeof window !== "undefined") {
                Cookies.remove("authToken");
                Cookies.remove("customerId");
            }
            set({ token: null, customerId: null, isUserLoggedIn: false });
        },

        setIsUserLoggedIn: (value) => set({ isUserLoggedIn: value }),
    };
});
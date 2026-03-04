import { useCallback } from "react";

type UseAuthReturn = {
    checkIsUserLoggedIn: () => void;
};

export const useAuth = (): UseAuthReturn => {
    const checkIsUserLoggedIn = useCallback(() => {
        console.log("Checking if user is logged in...");
    }, []);

    return { checkIsUserLoggedIn };
};
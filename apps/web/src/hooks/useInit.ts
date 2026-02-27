"use client";

import { useAuth } from "@/hooks";

export const useInit = () => {
    const { checkIsUserLoggedIn } = useAuth();

    /**
     * Initialization function called once on the first page mount
     */
    const init = () => {
        checkIsUserLoggedIn();
    };

    return { init };
};
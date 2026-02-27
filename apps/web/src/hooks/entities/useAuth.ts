type UseAuthReturn = {
    checkIsUserLoggedIn: () => void;
};

export const useAuth = (): UseAuthReturn => {
    const checkIsUserLoggedIn = () => {
        console.log("Checking if user is logged in...");
    };

    return { checkIsUserLoggedIn };
};
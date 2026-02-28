import axios from "axios";
import Cookies from "js-cookie";

export const apiClient = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true,
});

apiClient.interceptors.request.use(
    async (config) => {
        const token = Cookies.get("authToken");

        if (config.data instanceof FormData) {
            delete config.headers["Content-Type"];
        } else {
            config.headers["Content-Type"] = "application/json";
        }

        if (token) config.headers["Authorization"] = `Bearer ${token}`;

        try {
            const schoolContextStorage = localStorage.getItem(
                "school-context-storage",
            );
            if (schoolContextStorage) {
                const { state } = JSON.parse(schoolContextStorage);
                const selectedSchoolId = state?.selectedSchoolId;

                if (selectedSchoolId !== null && selectedSchoolId !== undefined) {
                    config.headers["X-School-Id"] = String(selectedSchoolId);
                }
            }
        } catch (error) {
            console.warn("Erreur lors de la récupération du contexte école:", error);
        }

        let csrfToken = Cookies.get("XSRF-TOKEN");

        if (!csrfToken) {
            await axios.get("/sanctum/csrf-cookie", { withCredentials: true });
            csrfToken = Cookies.get("XSRF-TOKEN");
        }

        if (csrfToken)
            config.headers["X-XSRF-TOKEN"] = decodeURIComponent(csrfToken);

        return config;
    },
    (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            Cookies.remove("authToken");
            localStorage?.removeItem("customerId");
            // if (typeof window !== "undefined") {
            // window.location.href = "/connexion";
            // }
        }
        return Promise.reject(error);
    },
);
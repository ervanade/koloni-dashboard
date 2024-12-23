import axios from "axios";
import { store } from "./store";
import { updateAccessToken, logoutUser } from "./authSlice";

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
});

api.interceptors.request.use((config) => {
    const state = store.getState();
    const accessToken = state.auth.user?.accessToken;

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const state = store.getState();
            const refreshToken = state.auth.user?.refreshToken;

            if (refreshToken) {
                try {
                    const refreshResponse = await axios.post(
                        `${import.meta.env.VITE_APP_API_URL}/auth/refresh`,
                        {},
                        {
                            headers: { Authorization: `Bearer ${refreshToken}` },
                        }
                    );

                    const newAccessToken = refreshResponse.data.access_token;
                    store.dispatch(updateAccessToken(newAccessToken));
                    localStorage.setItem("accessToken", newAccessToken);

                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return api(originalRequest);
                } catch (err) {
                    store.dispatch(logoutUser());
                    window.location.href = "/login";
                }
            } else {
                store.dispatch(logoutUser());
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default api;

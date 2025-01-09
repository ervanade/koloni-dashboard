import axios from "axios";
import { store } from "./index.js";
import { logoutUser } from "./authSlice.js";

// Tambahkan interceptor untuk menangani response
axios.interceptors.response.use(
    (response) => {
        // Jika response berhasil, langsung return
        return response;
    },
    (error) => {
        if (
            error.response &&
            error.response.status === 401 &&
            (
                error?.response?.data?.detail === "Token time expired: Signature has expired."
                // || error?.response?.data?.detail === "Invalid token: Not enough segments"
            )
        ) {
            // Logout user
            store.dispatch(logoutUser());

            // Redirect ke halaman login
            window.location.href = "/login";
        }

        // Tetap lempar error untuk ditangani oleh caller
        return Promise.reject(error);
    }
);

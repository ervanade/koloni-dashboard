import axios from "axios";
import { store } from "./index.js";
import { logoutUser } from "./authSlice.js";
import Swal from "sweetalert2";

// Tambahkan interceptor untuk menangani response
const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    },
});
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
                || error?.response?.data?.detail === "Invalid token: Not enough segments"
            )
        ) {
            // Logout user
            store.dispatch(logoutUser());

            // Redirect ke halaman login
            window.location.href = "/login";
            Swal.fire({
                icon: "warning",
                title: "Session expired. Please log in again.",
            });
        }

        // Tetap lempar error untuk ditangani oleh caller
        return Promise.reject(error);
    }
);

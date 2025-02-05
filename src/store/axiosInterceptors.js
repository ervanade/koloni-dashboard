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
            error.response.status === 401 
            &&
            (
                error?.response?.data?.detail === "Token time expired: Signature has expired."
                || error?.response?.data?.detail === "Invalid token: Not enough segments"
                || error?.response?.data?.detail === "Invalid token: Invalid header string: 'utf-8' codec can't decode byte 0xb1 in position 0: invalid start byte"

            )
        ) {
            // Logout user
            store.dispatch(logoutUser());

            // Redirect ke halaman login
            Swal.fire({
                icon: "warning",
                title: "Session expired",
                text: "Please log in again.",
                timer: 1500, // Swal akan otomatis tertutup dalam 2.5 detik
                // showConfirmButton: false,
                willClose: () => {
                    window.location.href = "/login"; // Redirect setelah Swal tertutup
                }
            });
            return; // Hentikan eksekusi lebih lanjut agar tidak langsung redirect

        }

        // Tetap lempar error untuk ditangani oleh caller
        return Promise.reject(error);
    }
);

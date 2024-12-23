import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    accessToken: null,
    refreshToken: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload; // Gabungan data user dan token
        },
        logoutUser: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        },
        updateAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
    },
});

export default authSlice.reducer;
export const { loginUser, logoutUser, updateAccessToken } = authSlice.actions;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
    signedIn: false,
    momoActivated: false,
    streak: 0,
    level: 0,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = false;
        },
        login: (state) => {
            state.signedIn = true;
        },
        logout: (state) => {
            state.signedIn = false;
        },
        activateMomo: (state) => {
            state.momoActivated = true;
        },
    },
});

export const { setLoading, login, logout, activateMomo } = userSlice.actions;

export default userSlice.reducer;

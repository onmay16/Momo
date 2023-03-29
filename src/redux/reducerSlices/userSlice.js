import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    signedIn: false,
    momoActivated: false,
    streak: 0,
    level: 0,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
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

export const { login, logout, activateMomo } = userSlice.actions;

export default userSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';

import userReducer from './reducerSlices/userSlice';
import modalSlice from './reducerSlices/modalSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        modal: modalSlice,
    },
});

export default store;

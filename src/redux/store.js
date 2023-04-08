import { configureStore } from '@reduxjs/toolkit';

import userSlice from './reducerSlices/userSlice';
import modalSlice from './reducerSlices/modalSlice';
import userRoutineSlice from './reducerSlices/userRoutineSlice';

const store = configureStore({
    reducer: {
        user: userSlice,
        modal: modalSlice,
        userRoutineSlice: userRoutineSlice,
    },
});

export default store;

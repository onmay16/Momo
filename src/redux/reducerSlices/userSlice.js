import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserBasic } from '../../api/userApi';

const initialState = {
    isLoading: true,
    isApiLoading: false,
    error: null,
    signedIn: false,
    momoActivated: false,
    streak: 0,
    level: 0,
    exp: 0,
    requiredPointToNextLevel: 0,
    currentPoint: 0,
    remainingPoint: 0,
    progress: 0,
    wakeUpTime: null,
    CompleteTime: null,
};

export const fetchUserBasic = createAsyncThunk(
    'userSlice/fetchUserBasic',
    async () => {
        const response = await getUserBasic();
        return response.data;
    }
);

const reuiqredPointDict = {
    0: 0,
    1: 190,
    2: 399,
    3: 1140,
    4: 2462,
    5: 5994,
    6: 18006,
    7: 590855,
    9: 122803,
    10: 2306085,
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
        updateExp: (state, action) => {
            switch (action.payload.case) {
                case 'INCREMENT_EXP':
                    state.exp += action.payload.amount;
                    state.currentPoint = state.exp - reuiqredPointDict[state.level - 1];
                    state.remainingPoint = state.requiredPointToNextLevel - state.currentPoint;
                    state.progress = state.currentPoint / state.requiredPointToNextLevel;
                    break;
                case 'DECREMENT_EXP':
                    state.exp -= action.payload.amount;
                    state.currentPoint = state.exp - reuiqredPointDict[state.level - 1];
                    state.remainingPoint = state.requiredPointToNextLevel - state.currentPoint;
                    state.progress = state.currentPoint / state.requiredPointToNextLevel;
                    break;
                default:
                    state;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserBasic.pending, (state) => {
                state.isApiLoading = true;
            })
            .addCase(fetchUserBasic.fulfilled, (state, action) => {
                state.isApiLoading = false;
                const data = action.payload.fields;
                state.exp = parseInt(data.momo_EXP.integerValue);
                state.level = parseInt(data.momo_level.integerValue);
                state.requiredPointToNextLevel = reuiqredPointDict[state.level];
                state.currentPoint = state.exp - reuiqredPointDict[state.level - 1];
                state.remainingPoint = state.requiredPointToNextLevel - state.currentPoint;
                state.progress = state.currentPoint / state.requiredPointToNextLevel;
                state.wakeUpTime = Date.parse(data.wake_up_time.timestampValue) / 1000;
                state.CompleteTime = Date.parse(data.routine_complete_time.timestampValue) / 1000;
            })
            .addCase(fetchUserBasic.rejected, (state, action) => {
                state.isApiLoading = false;
                state.error = action.error.message;
            });
    },
});

export const { setLoading, login, logout, activateMomo, updateExp } = userSlice.actions;
export default userSlice.reducer;

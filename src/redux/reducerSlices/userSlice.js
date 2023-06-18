import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserBasic, patchUser } from '../../api/userApi';

import { WakeUpStep } from '../../utils/WakeUpStep';

const initialState = {
  UUID: '',
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
  completeTime: null,
  remainingTime: null,
  isTutorialFinished: false,
  isRoutineFinished: false,
  isWakeUpStep: WakeUpStep.NONE,
  recentActionStartTime: null,
};

const requiredPointDict = {
  // this is accumulative
  1: 200,
  2: 420,
  3: 660,
  4: 920,
  5: 1200,
  6: 1500,
  7: 2000,
  8: 2650,
  9: 3750,
  10: 4950,
};

function updateLevel(exp) {
  for (const level in requiredPointDict) {
    if (requiredPointDict[level] > exp) {
      return parseInt(level);
    }
  }
}

function updateRequiredPointToNextLevel(level) {
  if (level > 1) {
    return requiredPointDict[level] - requiredPointDict[level - 1];
  } else {
    return requiredPointDict[level];
  }
}

function updateCurrentPoint(level, exp) {
  if (level > 1) {
    return exp - requiredPointDict[level - 1];
  } else {
    return exp;
  }
}

export const fetchUserBasic = createAsyncThunk(
  'userSlice/fetchUserBasic',
  async () => {
    const response = await getUserBasic();
    return response.data;
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUUID: (state, action) => {
      state.UUID = action.payload;
    },
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
      const dataBody = {
        fields: {
          is_activated: {
            stringValue: 'true',
          },
        },
      };
      patchUser(dataBody, ['is_activated']);
    },
    updateExp: (state, action) => {
      state.exp += action.payload.amount;
      state.level = updateLevel(state.exp);
      state.requiredPointToNextLevel = updateRequiredPointToNextLevel(
        state.level,
      );
      state.currentPoint = updateCurrentPoint(state.level, state.exp);
      state.remainingPoint =
        state.requiredPointToNextLevel - state.currentPoint;
      state.progress = state.currentPoint / state.requiredPointToNextLevel;
      const dataBody = {
        fields: {
          momo_exp: {
            integerValue: state.exp,
          },
        },
      };
      patchUser(dataBody, ['momo_exp']);
    },
    setWakeUpTime: (state, action) => {
      state.wakeUpTime = action.payload.wakeUpTime;
    },
    setIsWakeUpStep: (state, action) => {
        state.isWakeUpStep = action.payload.isWakeUpStep;
    },
    setCompleteTime: (state, action) => {
      state.completeTime = action.payload.completeTime;
    },
    setRemainingTime: (state) => {
      const completeTime = new Date(state.completeTime);
      const currentTime = new Date();
      currentTime.setFullYear(completeTime.getFullYear());
      currentTime.setMonth(completeTime.getMonth());
      currentTime.setDate(completeTime.getDate());
      state.remainingTime = Math.round((Date.parse(completeTime) - Date.parse(currentTime)) / 1000 / 60);
    },
    setIsTutorialFinished: (state, action) => {
      state.isTutorialFinished = action.payload.isTutorialFinished;
    },
    finishRoutine: (state) => {
      state.isRoutineFinished = true;
    },
    setRecentActionStartTime: (state, action) => {
      state.recentActionStartTime = action.payload.time;
      const dataBody = {
        fields: {
          recentaction_start_time: {
            timestampValue: state.recentActionStartTime,
          },
        },
      };
      patchUser(dataBody, ['recentaction_start_time']);
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
        state.momoActivated = (data.is_activated.stringValue === 'true');
        state.exp = parseInt(data.momo_exp.integerValue);
        state.level = updateLevel(state.exp);
        state.requiredPointToNextLevel = updateRequiredPointToNextLevel(state.level);
        state.currentPoint = updateCurrentPoint(state.level, state.exp);
        state.remainingPoint = state.requiredPointToNextLevel - state.currentPoint;
        state.progress = state.currentPoint / state.requiredPointToNextLevel;
        state.wakeUpTime = new Date(data.wake_up_time.timestampValue);
        state.completeTime = new Date(data.routine_complete_time.timestampValue);
        state.wakeUpTime = data.wake_up_time.timestampValue;
        state.completeTime = data.routine_complete_time.timestampValue;
        state.recentActionStartTime = data.recentaction_start_time.timestampValue;
        const completeTime = new Date(state.completeTime);
        const currentTime = new Date();
        currentTime.setFullYear(completeTime.getFullYear());
        currentTime.setMonth(completeTime.getMonth());
        currentTime.setDate(completeTime.getDate());
        state.remainingTime = Math.round((Date.parse(completeTime) - Date.parse(currentTime)) / 1000 / 60);
      })
      .addCase(fetchUserBasic.rejected, (state, action) => {
        state.isApiLoading = false;
        state.error = action.error.message;
      });
  },
},
);

export const {
  setUUID,
  setLoading,
  login,
  logout,
  activateMomo,
  updateExp,
  setWakeUpTime,
  setCompleteTime,
  setRemainingTime,
  setIsTutorialFinished,
  setIsWakeUpStep,
  finishRoutine,
  setRecentActionStartTime,
} = userSlice.actions;
export default userSlice.reducer;

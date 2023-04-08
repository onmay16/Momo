import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserRoutine } from '../../api/getUserRoutineApi';

export const fetchUserRoutine = createAsyncThunk(
  'userRoutineSlice/fetchUserRoutine',
  async () => {
    const response = await getUserRoutine();
    return response.data;
  }
);

const initialState = {
  userRoutineActionList: null,
  isLoading: false,
  error: null,
  status: '',
};

export const userRoutineSlice = createSlice({
  name: 'userRoutineSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRoutine.pending, (state) => {
        state.status = 'pending';
        state.isLoading = true;
      })
      .addCase(fetchUserRoutine.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.isLoading = false;
        // state.userRoutineActionList = action.payload;

        const data = action.payload.documents;
        let userRoutineActionList = [];
        for (let i = 0; i < data.length; i++) {
          const routine = data[i];
          const id = routine.name.match(/(r\w+)/g).at(-1);
          const fields = routine.fields;
          const duration = fields.duration.integerValue;
          // TODO: remove unused vars if they're not needed
          const emoji = fields.emoji.stringValue;
          const category = fields.category.stringValue;
          const routineName = fields.routine_name.stringValue;
          const difficulty = fields.difficulty.integerValue;
          const activeDay = fields.active_day.integerValue;
          const streak = fields.streak.integerValue;
          const routineObj = {
            id: id,
            name: routineName,
            category: category,
            complete: false,
            duration: duration,
          };
          userRoutineActionList.push(routineObj);
        }
        state.userRoutineActionList = userRoutineActionList;
      })
      .addCase(fetchUserRoutine.rejected, (state, action) => {
        state.status = 'rejected';
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { } = userRoutineSlice.actions;
export default userRoutineSlice.reducer;

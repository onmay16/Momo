import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  routineAddModal: false,
  routineAddListModal: true,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openRoutineAddModal: (state) => {
      state.routineAddModal = true;
    },
    closeRoutineAddModal: (state) => {
      state.routineAddModal = false;
    },
    openRoutineAddListModal: (state) => {
      state.RoutineAddListModal = true;
    },
    closeRoutineAddListModal: (state) => {
      state.RoutineAddListModal = false;
    },
  },
});

export const {
  openRoutineAddModal,
  closeRoutineAddModal,
  openRoutineAddListModal,
  closeRoutineAddListModal,
} = modalSlice.actions;

export default modalSlice.reducer;

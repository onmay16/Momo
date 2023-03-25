import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  routineAddModal: false,
  routineAddListModal: false,
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
      state.routineAddListModal = true;
    },
    closeRoutineAddListModal: (state) => {
      state.routineAddListModal = false;
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

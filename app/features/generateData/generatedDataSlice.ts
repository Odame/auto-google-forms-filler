import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IGeneratedData from './types';

const generatedDataSlice = createSlice({
  name: 'generatedData',
  initialState: [] as Array<IGeneratedData>,
  reducers: {
    editData: (
      state,
      action: PayloadAction<{ data: IGeneratedData; index: number }>
    ) => {
      state[action.payload.index] = action.payload.data;
    },
    setGeneratedData: (
      _state,
      action: PayloadAction<Array<IGeneratedData>>
    ) => {
      return action.payload;
    },
    clearGeneratedData: () => {
      return [] as Array<IGeneratedData>;
    },
  },
});

export const {
  editData,
  setGeneratedData,
  clearGeneratedData,
} = generatedDataSlice.actions;

export default generatedDataSlice.reducer;

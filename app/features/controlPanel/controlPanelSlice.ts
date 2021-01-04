import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ControlPanelData = {
  numSamples: number;
  headless: boolean;
  preEdit: boolean;
  rememberOptions: boolean;
};
export const defaultControlPanelData = {
  numSamples: 1,
  headless: true,
  preEdit: true,
  rememberOptions: true,
};
const controlPanelSlice = createSlice({
  name: 'controlPanel',
  initialState: defaultControlPanelData,
  reducers: {
    setOptions: (
      state,
      action: PayloadAction<Omit<ControlPanelData, 'rememberOptions'>>
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    rememberOptions: (state) => {
      state.rememberOptions = true;
    },
    forgetOptions: (state) => {
      state.rememberOptions = false;
    },
  },
});

export const {
  rememberOptions,
  forgetOptions,
  setOptions,
} = controlPanelSlice.actions;

export default controlPanelSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface OptionState {
  adjustmentOpen: boolean;
  paymentOpen: boolean;
  theme: string;
  toggle: boolean;
}

const initialState: OptionState = {
  adjustmentOpen: false,
  paymentOpen: false,
  theme: "",
  toggle: false
};

const utilsSlices = createSlice({
  name: "Utils",
  initialState,
  reducers: {
    openAdjustment: (state, action: PayloadAction<boolean>) => {
      state.adjustmentOpen = action.payload;
    },
    openPayment: (state, action: PayloadAction<boolean>) => {
      state.paymentOpen = action.payload;
    },

    switchTheme: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        theme: action.payload ? "dark" : "light",
        toggle: action.payload
      };
    }
  }
});

export const { openAdjustment, openPayment, switchTheme } = utilsSlices.actions;

export default utilsSlices.reducer;

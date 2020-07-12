import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Vendors {
  vendorId: string;
  vendorName: string;
  creditBal: number;
}

interface VendorsState {
  vendors: Vendors[];
  isLoading: boolean;
  error: string;
}

const initialState: VendorsState = {
  vendors: [],
  isLoading: false,
  error: ""
};

function startLoading(state: VendorsState) {
  state.isLoading = true;
}

const vendorsSlice = createSlice({
  name: "Vendors",
  initialState,
  reducers: {
    getVendorsStart: startLoading,
    getVendorsSuccess: (state, action: PayloadAction<Vendors[]>) => {
      state.isLoading = false;
      state.vendors = action.payload;
    },
    getVendorsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export const {
  getVendorsStart,
  getVendorsSuccess,
  getVendorsFailure
} = vendorsSlice.actions;

export default vendorsSlice.reducer;

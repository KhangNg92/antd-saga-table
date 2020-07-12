import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ColumnConfig {
  fieldName: string;
  displayName: string;
  display: boolean;
  filteringEnabled: boolean;
  sortingEnabled: boolean;
}

interface TableConfig {
  paymentEnabled: boolean;
  adjustmentEnabled: boolean;
  columns: ColumnConfig[];
}

interface DataEndpointsConfig {
  call2: object;
  call3: object;
  creditPost: object;
}

interface Config {
  tableConfig: TableConfig;
  endpoints: DataEndpointsConfig;
}

interface configState {
  config: Config;
  error: string;
  loading: boolean;
}

const initialState: configState = {
  config: {
    tableConfig: {
      paymentEnabled: false,
      adjustmentEnabled: false,
      columns: []
    },
    endpoints: {
      call2: {},
      call3: {},
      creditPost: {}
    }
  },
  error: "",
  loading: false
};

const startLoading = (state: configState) => {
  state.loading = true;
};

const configSlice = createSlice({
  name: "Config",
  initialState,
  reducers: {
    getConfigStart: startLoading,
    getConfigSuccess: (state, action: PayloadAction<Config>) => {
      state.loading = false;
      state.config = action.payload;
    },
    getConfigFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  getConfigStart,
  getConfigSuccess,
  getConfigFailure
} = configSlice.actions;

export default configSlice.reducer;

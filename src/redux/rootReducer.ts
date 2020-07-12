import { combineReducers } from "redux";

import invoicesReducer from "./slices/invoicesSlice";
import vendorsReducer from "./slices/vendorsSlice";
import utilsReducer from "./slices/utilsSlices";
import configReducer from "./slices/configSlice";

const rootReducer = combineReducers({
  invoices: invoicesReducer,
  vendors: vendorsReducer,
  utils: utilsReducer,
  config: configReducer
});

export default rootReducer;

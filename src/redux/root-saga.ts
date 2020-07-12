import { all, fork } from "@redux-saga/core/effects";
import { getInvoicesSaga } from "./saga/invoicesSaga";
import { getVendorsSaga } from "./saga/vendorsSaga";
import { getConfigSaga } from "./saga/getConfigSaga";

const sagas = [...getInvoicesSaga, ...getVendorsSaga, ...getConfigSaga];
export const rootSaga = function*() {
  yield all(sagas.map(fork));
};

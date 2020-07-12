import {
  getInvoicesStart,
  getInvoicesSuccess,
  getInvoicesFailure,
  submitPaymentSuccess,
  Invoices,
  submitPaymentStart,
  adjustInvoiceSuccess,
  adjustInvoiceStart,
  adjustInvoiceFailure,
  submitPaymentFailure
} from "../slices/invoicesSlice";
import { call, put, takeEvery, select } from "@redux-saga/core/effects";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { openPayment } from "../slices/utilsSlices";

const watchGetInvoices = function*() {
  yield takeEvery(getInvoicesStart.type, getInvoices);
};

const watchAdjustInvoices = function*() {
  yield takeEvery(adjustInvoiceStart.type, adjustInvoices);
};
const watchPaymentInvoices = function*() {
  yield takeEvery(submitPaymentStart.type, paymentHandle);
};

const getInvoices = function*() {
  try {
    const endpoint = yield select(
      (state: RootState) => state.config.config.endpoints
    );

    const { data } = yield call(() => axios.get(endpoint.call2.endpoint));

    yield put(getInvoicesSuccess(data));
  } catch (error) {
    yield put(getInvoicesFailure(error));
  }
};

const adjustInvoices = function*(action: PayloadAction<Invoices>) {
  const endpoint = yield select(
    (state: RootState) => state.config.config.endpoints
  );

  try {
    const { data } = yield call(() =>
      axios.post(`${endpoint.creditPost.endpoint}`, {
        remaningAmountDue:
          action.payload.amountDue - (action.payload.creditBal as number)
      })
    );

    yield put(
      adjustInvoiceSuccess({
        invoices: action.payload,
        remaining: data.remaningAmountDue
      })
    );
    if (data.remaningAmountDue > 0) {
      yield put(openPayment(true));
    }
  } catch (error) {
    console.error(error);
    yield put(adjustInvoiceFailure(error));
  }
};

const paymentHandle = function*(
  action: PayloadAction<{
    invoices: Invoices;
    CardNumber: string;
    amountPaid: number;
  }>
) {
  const endpoint = yield select(
    (state: RootState) => state.config.config.endpoints
  );
  try {
    const { data } = yield call(() =>
      axios.post(endpoint.paymentPost.endpoint, {
        amountPaid: action.payload.amountPaid,
        cardNumber: action.payload.CardNumber
      })
    );
    yield put(
      submitPaymentSuccess({
        invoices: action.payload.invoices,
        amountPaid: data.amountPaid
      })
    );
  } catch (error) {
    console.error(error);
    yield put(submitPaymentFailure(error));
  }
};

export const getInvoicesSaga = [
  watchGetInvoices,
  watchAdjustInvoices,
  watchPaymentInvoices
];

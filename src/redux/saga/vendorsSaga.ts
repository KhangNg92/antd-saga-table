import {
  getVendorsStart,
  getVendorsSuccess,
  getVendorsFailure
} from "../slices/vendorsSlice";
import { call, put, takeEvery, select } from "@redux-saga/core/effects";
import axios from "axios";
import { RootState } from "../store";

const watchGetVendors = function*() {
  yield takeEvery(getVendorsStart.type, getVendors);
};

const getVendors = function*() {
  try {
    const endpoint = yield select(
      (state: RootState) => state.config.config.endpoints
    );
    const { data } = yield call(() => axios.get(endpoint.call3.endpoint));

    yield put(getVendorsSuccess(data));
  } catch (error) {
    yield put(getVendorsFailure(error));
  }
};

export const getVendorsSaga = [watchGetVendors];

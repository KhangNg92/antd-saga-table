import {
  getConfigStart,
  getConfigSuccess,
  getConfigFailure
} from "../slices/configSlice";
import { call, put, takeEvery } from "@redux-saga/core/effects";
import axios from "axios";

const watchGetConfig = function*() {
  yield takeEvery(getConfigStart.type, getConfig);
};

const getConfig = function*() {
  try {
    const { data } = yield call(() => axios.get("/appConfig"));

    yield put(getConfigSuccess(data));
  } catch (error) {
    yield put(getConfigFailure(error));
  }
};

export const getConfigSaga = [watchGetConfig];

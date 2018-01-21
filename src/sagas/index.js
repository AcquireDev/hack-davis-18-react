import { takeEvery, takeLatest, put, select } from "redux-saga/effects";
import { push } from "react-router-redux";
import axios from "axios";

import { GET_USER, LOGIN_USER, LOOKUP_JWT } from "../actions/user";
import {
  GET_APPLICATIONS,
  MARK_APPLIED_SUCCESS,
  MARK_APPLIED,
  GET_NEW_APPS
} from "../actions/application";
import { fetchUser, loginUser, lookupJWT } from "./user";
import { fetchApplications, markApplied, fetchNewApps } from "./application";

// Selectors go here

export default function* rootSaga() {
  axios.defaults.baseURL = "https://hack-davis-18.herokuapp.com";
  yield takeLatest(GET_USER, fetchUser);
  yield takeLatest(LOGIN_USER, loginUser);
  yield takeLatest(GET_APPLICATIONS, fetchApplications);
  yield takeEvery(LOOKUP_JWT, lookupJWT);
  yield takeLatest(MARK_APPLIED, markApplied);
  yield takeLatest(MARK_APPLIED_SUCCESS, fetchApplications);
  yield takeLatest(GET_NEW_APPS, fetchNewApps);
  // takeEvery / takeLatest calls go here
}

// Nav modifiers
// function* switchToDashboard() {
//   yield put(push('/Dashboard'));
// }

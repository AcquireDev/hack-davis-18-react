import { takeEvery, takeLatest, put, select } from "redux-saga/effects";
import { push } from "react-router-redux";
import axios from "axios";

import { GET_USER, LOGIN_USER } from "../actions/user";
import { GET_APPLICATIONS } from "../actions/application";
import { fetchUser, loginUser } from "./user";
import { fetchApplications } from "./application";

// Selectors go here

export default function* rootSaga() {
  axios.defaults.baseURL = "https://hack-davis-18.herokuapp.com";
  yield takeLatest(GET_USER, fetchUser);
  yield takeLatest(LOGIN_USER, loginUser);
  yield takeLatest(GET_APPLICATIONS, fetchApplications);
  // takeEvery / takeLatest calls go here
}

// Nav modifiers
// function* switchToDashboard() {
//   yield put(push('/Dashboard'));
// }

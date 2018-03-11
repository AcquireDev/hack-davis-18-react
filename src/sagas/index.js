import { takeEvery, takeLatest, put, select } from "redux-saga/effects";
import { push } from "react-router-redux";
import axios from "axios";

import {
  GET_USER,
  LOGIN_USER,
  LOOKUP_JWT,
  CREATE_USER,
  LOGOUT
} from "../actions/user";
import {
  GET_APPLICATIONS,
  MARK_APPLIED_SUCCESS,
  MARK_APPLIED,
  CHANGE_STAGE,
  CHANGE_STAGE_SUCCESS
} from "../actions/application";
import { fetchUser, loginUser, lookupJWT, createUser } from "./user";
import { fetchApplications, markApplied, changeStage } from "./application";

// Selectors go here

export default function* rootSaga() {
  axios.defaults.baseURL = "https://hack-davis-18.herokuapp.com";
  yield takeLatest(GET_USER, fetchUser);
  yield takeLatest(LOGIN_USER, loginUser);
  yield takeLatest(GET_APPLICATIONS, fetchApplications);
  yield takeEvery(LOOKUP_JWT, lookupJWT);
  yield takeLatest(MARK_APPLIED, markApplied);
  yield takeLatest(MARK_APPLIED_SUCCESS, fetchApplications);
  yield takeLatest(CHANGE_STAGE, changeStage);
  yield takeEvery(CHANGE_STAGE_SUCCESS, fetchApplications);
  yield takeLatest(CREATE_USER, createUser);
  yield takeEvery(LOGOUT, logout);
  // takeEvery / takeLatest calls go here
}

function* logout() {
  yield localStorage.removeItem("jwt");
  yield put(push("/"));
}

// Nav modifiers
// function* switchToDashboard() {
//   yield put(push('/Dashboard'));
// }

import { takeEvery, takeLatest, put } from "redux-saga/effects";
import { push } from "react-router-redux";
import axios from "axios";

import {
  GET_USER,
  LOGIN_USER,
  LOOKUP_JWT,
  CREATE_USER,
  LOGOUT,
  SET_BOARD_ID
} from "../actions/user";
import {
  GET_APPLICATIONS,
  MARK_APPLIED_SUCCESS,
  MARK_APPLIED,
  CHANGE_STAGE,
  CHANGE_STAGE_SUCCESS
} from "../actions/application";
import { FETCH_JOB_BOARDS } from "../actions/job_boards";
import { CREATE_LISTING } from "../actions/listings";
import {
  fetchUser,
  loginUser,
  lookupJWT,
  createUser,
  setBoardId
} from "./user";
import { fetchApplications, markApplied, changeStage } from "./application";
import { createListing } from "./listing";
import { fetchJobBoards } from "./job_board";

// Selectors go here

export default function* rootSaga() {
  axios.defaults.baseURL = "https://api.acquire-jobs.com";
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
  yield takeEvery(CREATE_LISTING, createListing);
  yield takeLatest(FETCH_JOB_BOARDS, fetchJobBoards);
  yield takeLatest(SET_BOARD_ID, setBoardId);
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

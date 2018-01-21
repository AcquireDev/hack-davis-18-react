import { takeEvery, takeLatest, put, select } from "redux-saga/effects";
import { push } from "react-router-redux";
import axios from "axios";

// Selectors go here

export default function* rootSaga() {
  axios.defaults.baseURL = "https://hack-davis-18.herokuapp.com";
  // takeEvery / takeLatest calls go here
}

// Nav modifiers
// function* switchToDashboard() {
//   yield put(push('/Dashboard'));
// }

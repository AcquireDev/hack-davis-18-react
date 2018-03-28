import { call, put, select } from "redux-saga/effects";
import { push } from "react-router-redux";
import axios from "axios";

import {
  FETCH_JOB_BOARDS_FAILURE,
  FETCH_JOB_BOARDS_SUCCESS
} from "../actions/job_boards";

import { lookupJWT } from "../actions/user";

const getToken = state => state.user.token;

function* fetchJobBoards(action) {
  try {
    const token = yield select(getToken);

    if (!token && !action.no_redirect) {
      yield put({ type: FETCH_JOB_BOARDS_FAILURE, error: "Redirecting..." });
      yield put(push("/"));
      return;
    }
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    const response = yield axios({
      method: "get",
      url: "/job_boards.json"
    });
    const results = yield response.data;
    if (results.error) {
      yield put({ type: FETCH_JOB_BOARDS_FAILURE, error: results.error });
    } else {
      yield put({ type: FETCH_JOB_BOARDS_SUCCESS, results });
    }
  } catch (error) {
    yield put({ type: FETCH_JOB_BOARDS_FAILURE, error });
  }
}

export { fetchJobBoards };

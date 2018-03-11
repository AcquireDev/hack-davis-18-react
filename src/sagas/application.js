import { call, put, select } from "redux-saga/effects";
import { push } from "react-router-redux";
import axios from "axios";

import {
  GET_APPLICATIONS_SUCCESS,
  GET_APPLICATIONS_FAILURE,
  MARK_APPLIED_SUCCESS,
  MARK_APPLIED_FAILURE,
  CHANGE_STAGE_FAILURE,
  CHANGE_STAGE_SUCCESS
} from "../actions/application";

const getToken = state => state.user.token;

function* fetchApplications(action) {
  try {
    const token = yield select(getToken);

    if (!token && !action.no_redirect) {
      yield put({ type: GET_APPLICATIONS_FAILURE, error: "Redirecting..." });
      yield put(push("/"));
      return;
    }
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    const response = yield axios({
      method: "get",
      url: "/applications.json",
      params: {
        stage: true
      }
    });
    const result = yield response.data;

    if (result.error) {
      yield put({ type: GET_APPLICATIONS_FAILURE, error: result.error });
    } else {
      yield put({ type: GET_APPLICATIONS_SUCCESS, applications: result });
    }
  } catch (error) {
    yield put({ type: GET_APPLICATIONS_FAILURE, error });
  }
}

function* markApplied(action) {
  try {
    const token = yield select(getToken);

    if (!token) {
      yield put({ type: MARK_APPLIED_FAILURE, error: "Redirecting..." });
      yield put(push("/"));
      return;
    }
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    const response = yield axios({
      method: "patch",
      url: `/applications/${action.id}.json`,
      params: {
        applied: true
      }
    });
    const result = yield response.data;

    if (result.error) {
      yield put({ type: MARK_APPLIED_FAILURE, error: result.error });
    } else {
      yield put({ type: MARK_APPLIED_SUCCESS, result });
    }
  } catch (error) {
    yield put({ type: MARK_APPLIED_FAILURE, error });
  }
}

function* changeStage(action) {
  try {
    const token = yield select(getToken);

    if (!token) {
      yield put({ type: CHANGE_STAGE_FAILURE, error: "Redirecting..." });
      yield put(push("/"));
      return;
    }
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    const response = yield axios({
      method: "patch",
      url: `/applications/${action.id}.json`,
      params: {
        stage: action.stage
      }
    });
    const result = yield response.data;

    if (result.error) {
      yield put({ type: CHANGE_STAGE_FAILURE, error: result.error });
    } else {
      yield put({ type: CHANGE_STAGE_SUCCESS, result });
    }
  } catch (error) {
    yield put({ type: CHANGE_STAGE_FAILURE, error });
  }
}
export { fetchApplications, markApplied, changeStage };

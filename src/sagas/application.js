import { call, put, select } from "redux-saga/effects";
import { push } from "react-router-redux";
import axios from "axios";

import {
  GET_APPLICATIONS_SUCCESS,
  GET_APPLICATIONS_FAILURE,
  MARK_APPLIED_SUCCESS,
  MARK_APPLIED_FAILURE,
  GET_NEW_APPS_SUCCESS,
  GET_NEW_APPS_FAILURE
} from "../actions/application";

const getToken = state => state.user.token;

function* fetchApplications(action) {
  try {
    const token = yield select(getToken);

    if (!token) {
      yield put({ type: GET_APPLICATIONS_FAILURE, error: "Redirecting..." });
      yield put(push("/"));
      return;
    }
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    const response = yield axios({
      method: "get",
      url: "/applications.json"
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

function* fetchNewApps(action) {
  try {
    const token = yield select(getToken);

    if (!token) {
      yield put({ type: GET_APPLICATIONS_FAILURE, error: "Redirecting..." });
      yield put(push("/"));
      return;
    }
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    const response = yield axios({
      method: "get",
      url: "/applications.json",
      params: {
        new: true
      }
    });
    const result = yield response.data;

    if (result.error) {
      yield put({ type: GET_NEW_APPS_FAILURE, error: result.error });
    } else {
      yield put({ type: GET_NEW_APPS_SUCCESS, applications: result });
    }
  } catch (error) {
    yield put({ type: GET_NEW_APPS_FAILURE, error });
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

export { fetchApplications, markApplied, fetchNewApps };

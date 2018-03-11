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
        stage: true
      }
    });
    const result = yield response.data;

    if (result.error) {
      yield put({ type: GET_APPLICATIONS_FAILURE, error: result.error });
    } else {
      let sortedResult = {
        not_applied: [],
        applied: [],
        hidden: [],
        interviewing: [],
        rejected: [],
        offer: [],
        accepted: []
      };

      result.map(app => {
        switch (app.stage) {
          case "not_applied":
            sortedResult.not_applied.push(app);
            break;
          case "applied":
            sortedResult.applied.push(app);
            break;
          case "hidden":
            sortedResult.hidden.push(app);
            break;
          case "interviewing":
            sortedResult.interviewing.push(app);
            break;
          case "rejected":
            sortedResult.rejected.push(app);
            break;
          case "offer":
            sortedResult.offer.push(app);
            break;
          case "accepted":
            sortedResult.accepted.push(app);
            break;

          default:
            console.log(app);
            sortedResult.not_applied.push(app);
            break;
        }
      });

      yield put({ type: GET_APPLICATIONS_SUCCESS, applications: sortedResult });
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

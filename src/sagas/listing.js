import { put, select } from "redux-saga/effects";
import { push } from "react-router-redux";
import axios from "axios";

import { getApplications } from "../actions/application";

import {
  CREATE_LISTING_FAILURE,
  CREATE_LISTING_SUCCESS,
  MARK_LISTING_CLOSED_FAILURE,
  MARK_LISTING_CLOSED_SUCCESS,
} from "../actions/listings";

const getToken = state => state.user.token;
const getJobBoardId = state => state.user.job_board_id;

function* createListing(action) {
  try {
    const token = yield select(getToken);

    if (!token) {
      yield put({ type: CREATE_LISTING_FAILURE, error: "Redirecting..." });
      yield put(push("/"));
      return;
    }
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    const response = yield axios({
      method: "post",
      url: `/listings.json`,
      params: {
        company_name: action.companyName,
        url: action.url,
        job_title: action.positionName,
        job_board_id: action.boardId,
      },
    });
    const result = yield response.data;

    if (result.error) {
      yield put({ type: CREATE_LISTING_FAILURE, error: result.error });
    } else {
      const boardID = yield select(getJobBoardId);

      yield put(getApplications(boardID));
      yield put({ type: CREATE_LISTING_SUCCESS, result: result.id });
    }
  } catch (error) {
    yield put({ type: CREATE_LISTING_FAILURE, error });
  }
}

function* markListingClosed(action) {
  try {
    const token = yield select(getToken);

    if (!token) {
      yield put({ type: CREATE_LISTING_FAILURE, error: "Redirecting..." });
      yield put(push("/"));
      return;
    }
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    const response = yield axios({
      method: "patch",
      url: `/listings/${action.listingId}.json`,
      params: {
        closed: "true",
      },
    });
    const result = yield response.data;

    if (result.error) {
      yield put({ type: MARK_LISTING_CLOSED_FAILURE, error: result.error });
    } else {
      yield put({ type: MARK_LISTING_CLOSED_SUCCESS });
    }
  } catch (error) {
    yield put({ type: MARK_LISTING_CLOSED_FAILURE, error });
  }
}

export { createListing, markListingClosed };

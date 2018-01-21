import { call, put, select } from "redux-saga/effects";
import { push } from "react-router-redux";
import axios from "axios";

import {
  GET_USER_FAILURE,
  GET_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS
} from "../actions/user";

const getToken = state => state.user.token;

function* fetchUser(action) {
  try {
    const token = yield select(getToken);
    const response = yield axios({
      method: "get",
      headers: { HTTP_AUTHORIZATION: `Bearer ${token}` },
      url: "/current_user.json"
    });
    const result = yield response.data;

    if (result.error) {
      yield put({ type: GET_USER_FAILURE, error: result.error });
    } else {
      yield put({ type: GET_USER_SUCCESS, email: result.email, id: result.id });
    }
  } catch (error) {
    yield put({ type: GET_USER_FAILURE, error });
  }
}

function* loginUser(action) {
  try {
    const response = yield axios({
      method: "post",
      url: "/authenticate.json",
      params: {
        email: action.email,
        password: action.password
      }
    });
    const result = yield response.data;

    if (result.error) {
      yield put({ type: LOGIN_USER_FAILURE, error: result.error });
    } else {
      // Set header
      // axios.defaults.headers.common.Authorization = `Bearer ${result.jwt}`;
      // TODO: Save the JWT somewhere locally and on load check if it's there
      yield put({ type: LOGIN_USER_SUCCESS, token: result.jwt });
      yield put(push("/dashboard"));
    }
  } catch (error) {
    yield put({ type: LOGIN_USER_FAILURE, error });
  }
}

export { fetchUser, loginUser };

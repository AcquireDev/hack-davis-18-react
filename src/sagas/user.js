import { call, put, select } from "redux-saga/effects";
import { push } from "react-router-redux";
import axios from "axios";

import {
  GET_USER_FAILURE,
  GET_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOOKUP_JWT_SUCCESS,
  CREATE_USER_FAILURE,
  CREATE_USER_SUCCESS,
  SET_BOARD_ID_FAILURE,
  SET_BOARD_ID_SUCCESS
} from "../actions/user";

const getToken = state => state.user.token;

function* fetchUser(action) {
  try {
    const token = yield select(getToken);

    if (!token) {
      yield put(push("/"));
    }
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    const response = yield axios({
      method: "get",
      headers: { HTTP_AUTHORIZATION: `Bearer ${token}` },
      url: "/current_user.json"
    });
    const result = yield response.data;

    if (result.error) {
      yield put({ type: GET_USER_FAILURE, error: result.error });
    } else {
      yield put({
        type: GET_USER_SUCCESS,
        email: result.email,
        id: result.id,
        job_board_id: result.job_board_id,
        total_apps: result.total_applications,
        completed_apps: result.completed_applications
      });
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
      yield localStorage.setItem("jwt", result.jwt);
      yield put({ type: LOGIN_USER_SUCCESS, token: result.jwt });
      yield put(push("/dashboard"));
    }
  } catch (error) {
    yield put({ type: LOGIN_USER_FAILURE, error });
  }
}

const setAuthToken = jwt => {
  localStorage.setItem("jwt", jwt);
  console.log("HERE is your JWT");
  console.log(localStorage.getItem("jwt"));
};

function* createUser(action) {
  try {
    const response = yield axios({
      method: "post",
      url: "/users.json",
      params: {
        email: action.email,
        password: action.password
      }
    });
    const result = yield response.data;

    if (result.errors) {
      yield put({
        type: CREATE_USER_FAILURE,
        error: String(result.error.response.data.msg)
      });
    } else {
      yield call(setAuthToken, result.jwt);
      yield put({ type: CREATE_USER_SUCCESS, token: result.jwt });
      yield put(push("/dashboard"));
    }
  } catch (error) {
    yield put({
      type: CREATE_USER_FAILURE,
      error: error.response ? String(error.response.data.msg) : String(error)
    });
  }
}

function* setBoardId(action) {
  try {
    const token = yield select(getToken);

    if (!token) {
      yield put(push("/"));
    }
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    const response = yield axios({
      method: "patch",
      headers: { HTTP_AUTHORIZATION: `Bearer ${token}` },
      url: "/user_preferences/set_job_board.json",
      params: {
        board_id: action.boardId
      }
    });
    const result = yield response.data;

    if (result.error) {
      yield put({ type: SET_BOARD_ID_FAILURE, error: result.error });
    } else {
      yield put({
        type: SET_BOARD_ID_SUCCESS,
        email: result.email,
        id: result.id,
        job_board_id: result.job_board_id,
        total_apps: result.total_applications,
        completed_apps: result.completed_applications
      });
    }
  } catch (error) {
    yield put({ type: SET_BOARD_ID_FAILURE, error });
  }
}

function* lookupJWT(action) {
  try {
    const jwt = yield localStorage.getItem("jwt");
    yield console.log(`JWT: ${jwt}`);
    if (jwt && jwt.length > 0) {
      yield put({ type: LOOKUP_JWT_SUCCESS, jwt });
      yield put(push("/dashboard"));
    } else {
    }
  } catch (error) {}
}

export { fetchUser, loginUser, lookupJWT, createUser, setBoardId };

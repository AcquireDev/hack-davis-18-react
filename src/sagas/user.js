import { call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import axios from 'axios';

import {
  GET_USER_FAILURE,
  GET_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS
} from '../actions/user';

function* fetchUser(action) {
  try {
    const response = yield axios({
      method: 'get',
      url: '/current_user.json'
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
      method: 'post',
      url: '/authenticate.json',
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
      axios.defaults.headers.common.Authorization = `Bearer ${result.jwt}`;
      // TODO: Save the JWT somewhere locally and on load check if it's there
      yield put({ type: LOGIN_USER_SUCCESS });
      // yield put(push('/test'));
    }
  } catch (error) {
    yield put({ type: LOGIN_USER_FAILURE, error });
  }
}

export { fetchUser, loginUser };

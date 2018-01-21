import { call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import axios from 'axios';

import { GET_APPLICATIONS_SUCCESS, GET_APPLICATIONS_FAILURE } from '../actions/application';

const getToken = state => state.user.token;

function* fetchApplications(action) {
  try {
    const token = yield select(getToken);

    if (!token) {
      yield put({ type: GET_APPLICATIONS_FAILURE, error: 'Redirecting...' });
      yield put(push('/'));
      return;
    }
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    const response = yield axios({
      method: 'get',
      url: '/applications.json',
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

export { fetchApplications };

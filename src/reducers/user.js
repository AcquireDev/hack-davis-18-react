import {
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGIN_USER,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOOKUP_JWT_SUCCESS,
} from '../actions/user';

const initialState = {
  email: '',
  id: '',
  token: '',
  total_apps: 0,
  completed_apps: 0,
  loading: false,
  validated: false,
  loginError: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        email: action.email,
        total_apps: action.total_apps,
        completed_apps: action.completed_apps,
        id: action.id,
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case LOGIN_USER:
      return {
        ...state,
        loginError: false,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        validated: true,
        token: action.token,
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        loginError: true,
      };
    case LOOKUP_JWT_SUCCESS:
      return {
        ...state,
        token: action.jwt,
      };
    default:
      return state;
  }
};

export default reducer;

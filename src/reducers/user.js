import {
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS
} from '../actions/user';

const initialState = {
  email: '',
  id: '',
  loading: false,
  validated: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        loading: true
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        email: action.email,
        id: action.id
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        loading: false
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        validated: true
      };
    default:
      return state;
  }
};

export default reducer;

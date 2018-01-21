import {
  GET_APPLICATIONS,
  GET_APPLICATIONS_SUCCESS,
  GET_APPLICATIONS_FAILURE
} from "../actions/application";

const initialState = {
  applications: [],
  loadingApps: false,
  error: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_APPLICATIONS:
      return {
        ...state,
        loadingApps: true
      };
    case GET_APPLICATIONS_SUCCESS:
      return {
        ...state,
        loadingApps: false,
        applications: action.applications
      };
    case GET_APPLICATIONS_FAILURE:
      return {
        ...state,
        loadingApps: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default reducer;

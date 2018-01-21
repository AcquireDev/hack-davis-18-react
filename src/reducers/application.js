import {
  GET_APPLICATIONS,
  GET_APPLICATIONS_SUCCESS,
  GET_APPLICATIONS_FAILURE,
  MARK_APPLIED,
  MARK_APPLIED_SUCCESS,
  MARK_APPLIED_FAILURE,
  GET_NEW_APPS,
  GET_NEW_APPS_SUCCESS,
  GET_NEW_APPS_FAILURE
} from "../actions/application";

const initialState = {
  applications: [],
  newApplications: [],
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
    case GET_NEW_APPS:
      return {
        ...state,
        loadingApps: true
      };
    case GET_NEW_APPS_SUCCESS:
      return {
        ...state,
        loadingApps: false,
        newApplications: action.applications
      };
    case GET_NEW_APPS_FAILURE:
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

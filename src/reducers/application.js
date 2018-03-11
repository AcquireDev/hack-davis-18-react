import {
  GET_APPLICATIONS,
  GET_APPLICATIONS_SUCCESS,
  GET_APPLICATIONS_FAILURE,
  MARK_APPLIED,
  MARK_APPLIED_SUCCESS,
  MARK_APPLIED_FAILURE
} from "../actions/application";

const initialState = {
  loadingApps: false,
  loadingNewApps: false,
  error: {},
  applications: {
    not_applied: [],
    applied: [],
    hidden: [],
    interviewing: [],
    rejected: [],
    offer: [],
    accepted: []
  }
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

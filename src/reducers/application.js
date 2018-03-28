import {
  GET_APPLICATIONS,
  GET_APPLICATIONS_SUCCESS,
  GET_APPLICATIONS_FAILURE
} from "../actions/application";

import { LOGOUT } from "../actions/user";

const initialState = {
  loadingApps: false,
  loadingNewApps: false,
  initialLoaded: false,
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
        initialLoaded: true,
        applications: action.applications
      };
    case GET_APPLICATIONS_FAILURE:
      return {
        ...state,
        loadingApps: false,
        initialLoaded: true,
        error: action.error
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;

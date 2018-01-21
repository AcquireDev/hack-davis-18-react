export const GET_APPLICATIONS = "GET_APPLICATIONS";
export const GET_APPLICATIONS_SUCCESS = "GET_APPLICATIONS_SUCCESS";
export const GET_APPLICATIONS_FAILURE = "GET_APPLICATIONS_FAILURE";

export const MARK_APPLIED = "MARK_APPLIED";
export const MARK_APPLIED_SUCCESS = "MARK_APPLIED_SUCCESS";
export const MARK_APPLIED_FAILURE = "MARK_APPLIED_FAILURE";

export const GET_NEW_APPS = "GET_NEW_APPS";
export const GET_NEW_APPS_SUCCESS = "GET_NEW_APPS_SUCCESS";
export const GET_NEW_APPS_FAILURE = "GET_NEW_APPS_FAILURE";

export const getApplications = () => ({
  type: GET_APPLICATIONS
});

export const markApplied = id => ({
  type: MARK_APPLIED,
  id
});

export const getNewApps = () => ({
  type: GET_NEW_APPS
});

export const GET_APPLICATIONS = "GET_APPLICATIONS";
export const GET_APPLICATIONS_SUCCESS = "GET_APPLICATIONS_SUCCESS";
export const GET_APPLICATIONS_FAILURE = "GET_APPLICATIONS_FAILURE";

export const MARK_APPLIED = "MARK_APPLIED";
export const MARK_APPLIED_SUCCESS = "MARK_APPLIED_SUCCESS";
export const MARK_APPLIED_FAILURE = "MARK_APPLIED_FAILURE";

export const CHANGE_STAGE = "CHANGE_STAGE";
export const CHANGE_STAGE_SUCCESS = "CHANGE_STAGE_SUCCESS";
export const CHANGE_STAGE_FAILURE = "CHANGE_STAGE_FAILURE";

export const getApplications = () => ({
  type: GET_APPLICATIONS
});

export const getApplicationsNoRedirect = () => ({
  type: GET_APPLICATIONS,
  no_redirect: true
});

export const markApplied = id => ({
  type: MARK_APPLIED,
  id
});

export const changeStage = (id, stage) => ({
  type: CHANGE_STAGE,
  id,
  stage
});

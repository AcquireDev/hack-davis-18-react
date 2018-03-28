import {
  FETCH_JOB_BOARDS,
  FETCH_JOB_BOARDS_SUCCESS,
  FETCH_JOB_BOARDS_FAILURE
} from "../actions/job_boards";

const initialState = {
  job_boards: [],
  fetch_error: "",
  fetching: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOB_BOARDS:
      return {
        ...state,
        fetching: true
      };
    case FETCH_JOB_BOARDS_SUCCESS:
      return {
        ...state,
        fetching: false,
        job_boards: action.results
      };
    case FETCH_JOB_BOARDS:
      return {
        ...state,
        fetching: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default reducer;

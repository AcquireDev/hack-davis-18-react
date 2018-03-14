import {
  CREATE_LISTING,
  CREATE_LISTING_FAILURE,
  CREATE_LISTING_SUCCESS
} from "../actions/listings";

const initialState = {
  submitting_listing: false,
  last_added_id: -1,
  error: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_LISTING:
      return {
        ...state,
        submitting_listing: true
      };
    case CREATE_LISTING_SUCCESS:
      return {
        ...state,
        submitting_listing: false,
        last_added_id: action.result
      };
    case CREATE_LISTING_FAILURE:
      return {
        ...state,
        submitting_listing: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default reducer;

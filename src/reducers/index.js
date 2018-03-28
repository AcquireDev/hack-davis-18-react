import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import user from "./user";
import applications from "./application";
import listing from "./listing";
import jobBoard from "./job_board";

export default combineReducers({
  router: routerReducer,
  user,
  applications,
  listing,
  jobBoard
});

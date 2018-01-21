import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducers from "../reducers";
import rootSaga from "../sagas";

// Create a history of your choosing (we're using a browser history in this case)

// Build the middleware for intercepting and dispatching navigation actions

const sagaMiddleware = createSagaMiddleware();
const middleware = [];
middleware.push(sagaMiddleware);

// Setup middleware for react router
export const history = createHistory();
middleware.push(routerMiddleware(history));

// Only add logger in development
if (process.env.NODE_ENV === "development") {
  // This should always be the last middleware added
  middleware.push(logger);
}

const store = createStore(reducers, applyMiddleware(...middleware));
sagaMiddleware.run(rootSaga);

export default store;

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import store, { history } from "./config/store";
import Splash from "./screens/Splash.js";
import Login from "./screens/Login.js";
import Dashboard from "./screens/Dashboard.js";
import AccountSetup from "./screens/AccountSetup.js";
import Landing from "./screens/Landing.js";
import Signup from "./screens/Signup.js";

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div style={{ minHeight: "100vh" }}>
        <Switch>
          <Route exact path="/splash" component={Splash} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/loading-account" component={AccountSetup} />
          <Route component={Landing} />
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();

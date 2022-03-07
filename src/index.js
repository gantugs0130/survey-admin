import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Routes from "./router/index";
const rootElement = document.getElementById("wrap");
require("../static/css/style.less");
import { Router } from "react-router-dom";
import configureReducer from "./store";
import { Provider } from "react-redux";
import { createBrowserHistory as createHistory } from "history";
let history = createHistory();
const store = configureReducer();
ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Routes />
        </Router>
    </Provider>,
    rootElement
);

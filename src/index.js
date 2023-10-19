import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { compose, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { rootReducer } from "./services/reducers";
import { socketMiddleware } from "./services/middleware/socketMiddleware";
import { wsActions, wsAuthActions } from "./services/actions/ws-action";
const wsUrl = "wss://norma.nomoreparties.space";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancers = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware(`${wsUrl}/orders`, wsAuthActions, true),
    socketMiddleware(`${wsUrl}/orders/all`, wsActions, false)
  )
);

export const store = createStore(rootReducer, enhancers);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

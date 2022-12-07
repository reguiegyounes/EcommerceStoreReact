import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import './app/layout/styles.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import {createBrowserHistory} from 'history';
import { store } from './app/store/configureStore';

export const history=createBrowserHistory();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HistoryRouter  history={history}>
        <Provider store={store}>
          <App />
        </Provider>
    </HistoryRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

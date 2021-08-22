import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import ReduxStore from './redux/store';

import "./assets/css/index.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const rerenderPage =  async (state?: any): Promise<void> => {
  ReactDOM.render(
    <React.StrictMode>
      <App
        store={ReduxStore}
        dispatch={ReduxStore.dispatch.bind(ReduxStore)}
        state={state}
      />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

const rerenderWithUpdatedState = () => rerenderPage(ReduxStore.getState());

rerenderWithUpdatedState();
ReduxStore.subscribe(rerenderWithUpdatedState);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

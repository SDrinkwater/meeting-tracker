import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { forOwn } from 'lodash';
import { fromJS } from 'immutable';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';

import reducers from './reducers';

import registerServiceWorker from './registerServiceWorker';

import './styles.css';
import App from './App';

let middleware;
if (process.env.NODE_ENV === 'development') {
  middleware = [
    ReduxThunk,
    createLogger(),
  ];
} else {
  middleware = [ReduxThunk];
}

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};

// Iterate over each object in the persisted state and convert it to an immutable map
forOwn(persistedState, (value, key) => persistedState[key] = fromJS(value));

const store = createStore(
  reducers,
  persistedState,
  applyMiddleware(...middleware),
);

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

const WrappedApp = () => (
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>
);

ReactDOM.render(<WrappedApp />, document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';

import reducers from './reducers';

import registerServiceWorker from './registerServiceWorker';

import './styles.css';
import App from './App';

const store = createStore(
  reducers,
  applyMiddleware(createLogger()),
);

const WrappedApp = () => (
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>
);

ReactDOM.render(<WrappedApp />, document.getElementById('root'));
injectTapEventPlugin();
registerServiceWorker();

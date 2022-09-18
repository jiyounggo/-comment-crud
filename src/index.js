import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import ReduxThunk from 'redux-thunk';
import comments from './modules/comments';
import logger from 'redux-logger';

const container = document.getElementById('root');
const root = createRoot(container);

const store = createStore(
  comments,
  composeWithDevTools(applyMiddleware(ReduxThunk, logger))
);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      {/* <React.StrictMode> */}
      <App />
      {/* </React.StrictMode> */}
    </Provider>
  </BrowserRouter>
);

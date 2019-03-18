import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromis from 'redux-promise';

import App from './components/app';
import reducers from './reducers';

// 미들웨어는 리듀서로 가기전에 그사이를 막거나 수정 또는 액션을 취할수 있다.
// redux-promise는 ajax request에 도움이 되는 미들웨어
const createStoreWithMiddleware = applyMiddleware(ReduxPromis)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.container'));

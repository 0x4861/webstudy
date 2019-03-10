import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

// 리듀서는 어플리케이션의 스테이트를 반한하기 위해 사용한다
// 스테이트는 평범한 자바스크립트 객체이고, 스테이트의 키나 값은 리듀서에의해 생산된다.
// 리액트는 뷰를 담당하고, 리덕스가 데이터 관리를 담당. 리액트-리덕스는 이둘을 이어주기 위함.
// 리듀서의 스테이트와 스테이트 변경을 위한 액션들을 서로 어떻게 주고 받는지 이해해야 한다.
import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.container'));

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import  applyMiddleware from './middleware';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {getAllDataAction,globalReducer} from './actions/actions'



const _store_ = createStore(globalReducer,applyMiddleware)
//_store_.dispatch(getAllDataAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={_store_}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

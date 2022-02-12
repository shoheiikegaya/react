import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import createStore from './reducks/store/store';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//テーマプロバイダの設定
//import { MuiThemeProvider } from "@material-ui/core";
//import { theme } from "./assets/theme";

//Router設定
import {ConnectedRouter} from 'connected-react-router';
import * as History from 'history';
const history = History.createBrowserHistory();

//ストアの情報を設定
export const store = createStore(history);

//ProviderはラップしたコンポーネントにStoreの情報を渡す。
//Storeの情報をProviderでラップされたコンポーネントで見られるようにする
//Appコンポーネントはアプリケーションのルートなので、アプリケーション全体でStoreの情報が見られるようになる
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

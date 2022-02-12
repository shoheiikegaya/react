import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
  compose,
} from "redux";

import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import persistState from "redux-localstorage";

import { UsersReducer } from "../users/reducers";
import { CvDataReducer } from "../cvdata/reducers";

export default function createStore(history) {
  return compose(persistState())(reduxCreateStore)(
    combineReducers({
      cvdata: CvDataReducer,
      users: UsersReducer,
      router: connectRouter(history),
    }),
    applyMiddleware(routerMiddleware(history), thunk)
  );
}

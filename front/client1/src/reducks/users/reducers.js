import * as Actions from './actions';
import initialState from '../store/InitialState';

export const UsersReducer = (state = initialState.users, action) => {
  switch (action.type) {
    case Actions.SIGN_IN:
      return {
        ...state,
        ...action.payload
      }
      case Actions.SIGN_OUT:
        return {
          ...state,
          ...action.payload
       }
    default:
      return state
  }
};


//スプレッド構文でのマージ
//const payload = {
//  uid: "00000",
//  username: "ikegaya"
//}
//console.log({...payload})
//// {uid: "00000", username: "ikegaya"}

////Merge Objects
//const state = { isSignedIn: false }
//console.log(...state, ...payload)

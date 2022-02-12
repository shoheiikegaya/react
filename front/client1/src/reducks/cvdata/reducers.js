import * as Actions from './actions';
import initialState from '../store/InitialState';

export const CvDataReducer = (state = initialState.cvdata, action) => {
  switch (action.type) {
    case Actions.CV_DATA:
      return {
        ...state,
        ...action.payload
      }
      case Actions.CV_DATA_TOTAL:
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

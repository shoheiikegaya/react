import {createSelector} from 'reselect';

const usersSelector = (state) => state.users;
const usersSelector1 = (state) => state.token;

export const getUserId = createSelector(
  [usersSelector],
  state => state.uid
);

export const getUsername = createSelector(
  [usersSelector],
  state => state.username
);

export const getToken = createSelector(
  [usersSelector],
  state => state.token
);

export const getIsSignedIn = createSelector(
  [usersSelector],
  state => state.isSignedIn

);



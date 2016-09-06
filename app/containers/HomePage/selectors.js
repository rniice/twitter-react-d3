/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = () => (state) => state.get('home');

const selectUsername = () => createSelector(
  selectHome(),
  (homeState) => homeState.get('username')
);

const selectTwitterHash = () => createSelector(
  selectHome(),
  (homeState) => homeState.get('twitterhash')
);

export {
  selectHome,
  selectUsername,
  selectTwitterHash,
};

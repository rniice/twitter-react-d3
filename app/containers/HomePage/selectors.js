/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = () => (state) => state.get('home');

const selectTwitterHash = () => createSelector(
  selectHome(),
  (homeState) => homeState.get('twitterhash')
);

export {
  selectHome,
  selectTwitterHash,
};

/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = () => (state) => state.get('global');

const selectCurrentTwitterHash = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('twitterHash')
);

const selectLoading = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('loading')
);

const selectError = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('error')
);

const selectTwitterData = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['twitterData', 'contents'])
);

const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  selectGlobal,
  selectLoading,
  selectError,
  selectCurrentTwitterHash,
  selectTwitterData,
  selectLocationState,
};

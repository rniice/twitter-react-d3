/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import {
  LOAD_TWITTER,
  LOAD_TWITTER_SUCCESS,
  LOAD_TWITTER_ERROR,
} from './constants';
import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  twitterHash: false,
  twitterData: fromJS({
    contents: false,
  }),
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TWITTER:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['twitterData', 'contents'], false);
    case LOAD_TWITTER_SUCCESS:
      return state
        .setIn(['twitterData', 'contents'], action.twitterData)
        .set('loading', false)
        .set('twitterHash', action.twitterHash);
    case LOAD_TWITTER_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;

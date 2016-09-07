/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your appliction state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_TWITTER,
  LOAD_TWITTER_SUCCESS,
  LOAD_TWITTER_ERROR,
} from './constants';

/**
 * Load the twitter data, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_TWITTER
 */
export function loadTwitterData() {
  return {
    type: LOAD_TWITTER,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} hashtag The current hashtag
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function twitterLoaded(twitterData, twitterHash) {
  return {
    type: LOAD_TWITTER_SUCCESS,
    twitterData,
    twitterHash,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function twitterLoadingError(error) {
  return {
    type: LOAD_TWITTER_ERROR,
    error,
  };
}

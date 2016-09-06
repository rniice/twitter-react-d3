/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_TWITTER } from 'containers/App/constants';
import { twitterLoaded, twitterLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { selectTwitterHash } from 'containers/HomePage/selectors';

import dateFormat from 'dateformat';

// created heroku app to access twitter API from backend without exposing AUTH KEYS
const twitterAPIServer = 'https://vast-citadel-27905.herokuapp.com/search/tweets';

/**
 * Twitter Data request/response handler
 */

/* TWITTER DATA HELPER PROCESSOR FUNCTION */
// extract the top 5 most retweeted tweets with selected hashtag
function processTwitterData(data) {
  const result = data.sort((a, b) => {
    return (b.retweet_count - a.retweet_count);
  }).slice(0, 5);

  return result;   // {data[index].retweet_count}, {.text}, {.user.screen_name}
}

export function* getTwitter() {
  // Select twitterHash from store
  const twitterHash = yield select(selectTwitterHash());
  const now = new Date();
  const dateNow = dateFormat(now, 'isoDate');
  // parse data into the get request api for data from twitter
  // const requestURL = '${twitterAPIServer}?text=${twitterHash}&date=${dateNow}';
  const requestURL = (twitterAPIServer + '?text=' + twitterHash + '&date=' + dateNow).toString();
  // Call our request helper (see 'utils/request')
  const twitterResponse = yield call(request, requestURL);
  const twitterDataReturned = processTwitterData(twitterResponse.data.statuses);

  if (twitterDataReturned.length > 0) {
    yield put(twitterLoaded(twitterDataReturned, twitterHash));
  } else {
    yield put(twitterLoadingError('error loading twitter data'));
  }
}

/**
 * Watches for LOAD_TWITTER action and calls handler
 */
export function* getTwitterWatcher() {
  while (yield take(LOAD_TWITTER)) {
    yield call(getTwitter);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* twitterData() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(getTwitterWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  twitterData,
];

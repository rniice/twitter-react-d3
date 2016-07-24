/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_REPOS, LOAD_TWITTER } from 'containers/App/constants';
import { reposLoaded, repoLoadingError, twitterLoaded, twitterLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { selectUsername, selectTwitterHash } from 'containers/HomePage/selectors';

import dateFormat from 'dateformat';

//created heroku app to access twitter API from backend without exposing AUTH KEYS
const twitter_api_server = 'https://vast-citadel-27905.herokuapp.com/search/tweets';

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  const username = yield select(selectUsername());
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  // Call our request helper (see 'utils/request')
  const repos = yield call(request, requestURL);

  if (!repos.err) {
    yield put(reposLoaded(repos.data, username));
  } else {
    yield put(repoLoadingError(repos.err));
  }
}

/**
 * Twitter Data request/response handler
 */
export function* getTwitter() {
  // Select twitter_hash from store
  const twitter_hash = yield select(selectTwitterHash());
  const now = new Date();
  const date_now = dateFormat(now,"isoDate");

  //parse data into the get request api for data from twitter
  const requestURL = twitter_api_server + '?text=' + twitter_hash + '&date=' + date_now;

  // Call our request helper (see 'utils/request')
  const twitter_response = yield call(request, requestURL);
  const twitter_data = processTwitterData(twitter_response.data.statuses);

  if (twitter_data.length > 0) {
    yield put(twitterLoaded(twitter_data, twitter_hash));
  } else {
    yield put(twitterLoadingError("error loading twitter data"));
  }
}

/* TWITTER DATA HELPER PROCESSOR FUNCTION */
//extract the top 5 most retweeted tweets with selected hashtag
function processTwitterData(data){
  let result = data.sort((a,b) => {
    return b.retweet_count - a.retweet_count;
  }).slice(0,5);

  return result;   // {data[index].retweet_count}, {.text}, {.user.screen_name}
}

/******************************************/


/**
 * Watches for LOAD_REPOS action and calls handler
 */
export function* getReposWatcher() {
  while (yield take(LOAD_REPOS)) {
    yield call(getRepos);
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
export function* githubData() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(getReposWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
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
  githubData,
  twitterData
];

import { fromJS } from 'immutable';
import expect from 'expect';

import {
  selectGlobal,
  selectCurrentTwitterHash,
  selectLoading,
  selectError,
  selectTwitterData,
  selectLocationState,
} from '../selectors';

describe('selectGlobal', () => {
  const globalSelector = selectGlobal();
  it('should select the global state', () => {
    const globalState = fromJS({});
    const mockedState = fromJS({
      global: globalState,
    });
    expect(globalSelector(mockedState)).toEqual(globalState);
  });
});

describe('selectCurrentTwitterHash', () => {
  const currentUserSelector = selectCurrentTwitterHash();
  it('should select the current user', () => {
    const hashtag = 'mxstbr';
    const mockedState = fromJS({
      global: {
        twitterHash: hashtag,
      },
    });
    expect(currentUserSelector(mockedState)).toEqual(hashtag);
  });
});

describe('selectLoading', () => {
  const loadingSelector = selectLoading();
  it('should select the loading', () => {
    const loading = false;
    const mockedState = fromJS({
      global: {
        loading,
      },
    });
    expect(loadingSelector(mockedState)).toEqual(loading);
  });
});

describe('selectError', () => {
  const errorSelector = selectError();
  it('should select the error', () => {
    const error = 404;
    const mockedState = fromJS({
      global: {
        error,
      },
    });
    expect(errorSelector(mockedState)).toEqual(error);
  });
});

describe('selectTwitterData', () => {
  const twitterDataSelector = selectTwitterData();
  it('should select the twitterdata', () => {
    const twitterDataContents = fromJS('stuff');
    const mockedState = fromJS({
      global: {
        twitterData: {
          contents: twitterDataContents,
        },
      },
    });
    expect(twitterDataSelector(mockedState)).toEqual(twitterDataContents);
  });
});

describe('selectLocationState', () => {
  const locationStateSelector = selectLocationState();
  it('should select the route as a plain JS object', () => {
    const route = fromJS({
      locationBeforeTransitions: null,
    });
    const mockedState = fromJS({
      route,
    });
    expect(locationStateSelector(mockedState)).toEqual(route.toJS());
  });
});

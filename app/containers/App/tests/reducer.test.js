import expect from 'expect';
import appReducer from '../reducer';
import {
  loadTwitterData,
  twitterLoaded,
  twitterLoadingError,
} from '../actions';
import { fromJS } from 'immutable';

describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      loading: false,
      error: false,
      twitterHash: false,
      twitterData: fromJS({
        contents: false,
      }),
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadTwitterData action correctly', () => {
    const expectedResult = state
      .set('loading', true)
      .set('error', false)
      .setIn(['twitterData', 'contents'], false);

    expect(appReducer(state, loadTwitterData())).toEqual(expectedResult);
  });

  it('should handle the twitterLoaded action correctly', () => {
    const fixture = [{
      name: 'some data',
      data: 'some more data',
    }];
    const hashtag = 'test';
    const expectedResult = state
      .setIn(['twitterData', 'contents'], fixture)
      .set('loading', false)
      .set('twitterHash', hashtag);

    expect(appReducer(state, twitterLoaded(fixture, hashtag))).toEqual(expectedResult);
  });

  it('should handle the twitterLoadingError action correctly', () => {
    const fixture = {
      msg: 'Not found',
    };
    const expectedResult = state
      .set('error', fixture)
      .set('loading', false);

    expect(appReducer(state, twitterLoadingError(fixture))).toEqual(expectedResult);
  });
});

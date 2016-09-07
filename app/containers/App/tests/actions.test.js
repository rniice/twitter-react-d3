import expect from 'expect';

import {
  LOAD_TWITTER,
  LOAD_TWITTER_SUCCESS,
  LOAD_TWITTER_ERROR,
} from '../constants';

import {
  loadTwitterData,
  twitterLoaded,
  twitterLoadingError,
} from '../actions';

describe('App Actions', () => {
  describe('loadTwitterData', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOAD_TWITTER,
      };

      expect(loadTwitterData()).toEqual(expectedResult);
    });
  });
  describe('twitterLoaded', () => {
    it('should return the correct type and the passed repos', () => {
      const fixture = ['Test'];
      const hashtag = 'test';
      const expectedResult = {
        type: LOAD_TWITTER_SUCCESS,
        twitterData: fixture,
        twitterHash: hashtag,
      };
      expect(twitterLoaded(fixture, hashtag)).toEqual(expectedResult);
    });
  });
  describe('twitterLoadingError', () => {
    it('should return the correct type and the error', () => {
      const fixture = {
        msg: 'Something went wrong!',
      };
      const expectedResult = {
        type: LOAD_TWITTER_ERROR,
        error: fixture,
      };
      expect(twitterLoadingError(fixture)).toEqual(expectedResult);
    });
  });
});

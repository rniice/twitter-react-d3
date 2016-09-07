import expect from 'expect';

import {
  CHANGE_TWITTER_HASH,
} from '../constants';

import {
  changeTwitterHash,
} from '../actions';

describe('Home Actions', () => {
  describe('changeTwitterHash', () => {
    it('should return the correct type and the passed name', () => {
      const fixture = 'Max';
      const expectedResult = {
        type: CHANGE_TWITTER_HASH,
        name: fixture,
      };

      expect(changeTwitterHash(fixture)).toEqual(expectedResult);
    });
  });
});

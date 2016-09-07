import expect from 'expect';
import homeReducer from '../reducer';
import {
  changeTwitterHash,
} from '../actions';
import { fromJS } from 'immutable';

describe('homeReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      twitterHash: '',
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(homeReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the changeTwitterHash action correctly', () => {
    const fixture = 'mxstbr';
    const expectedResult = state.set('twitterHash', fixture);

    expect(homeReducer(state, changeTwitterHash(fixture))).toEqual(expectedResult);
  });
});

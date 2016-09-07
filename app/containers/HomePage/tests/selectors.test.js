import { fromJS } from 'immutable';
import expect from 'expect';

import {
  selectHome,
  selectTwitterHash,
} from '../selectors';

describe('selectHome', () => {
  const homeSelector = selectHome();
  it('should select the home state', () => {
    const homeState = fromJS({
      userData: {},
    });
    const mockedState = fromJS({
      home: homeState,
    });
    expect(homeSelector(mockedState)).toEqual(homeState);
  });
});

describe('selectTwitterHash', () => {
  const twitterHashSelector = selectTwitterHash();
  it('should select the twitter hash', () => {
    const twitterhash = 'mxstbr';
    const mockedState = fromJS({
      home: {
        twitterhash,
      },
    });
    expect(twitterHashSelector(mockedState)).toEqual(twitterhash);
  });
});

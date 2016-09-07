import RD3PIE from '../index';
import expect from 'expect';
import { render } from 'enzyme';

import React from 'react';

const data = [
  {
    user: {
      screen_name: 'Bill',
    },
    retweet_count: 50,
    text: 'woot, here is tweet 1!',
  },
  {
    user: {
      screen_name: 'Joe',
    },
    retweet_count: 49,
    text: 'woot, here is tweet 2!',
  },
];

describe('<RD3PIE />', () => {
  it('should render N/A in component if no items are passed', () => {
    const renderedComponent = render(
      <RD3PIE items={[]} />
    );
    expect(renderedComponent.find('NA')).toExist();
  });
  it('should render its pie chart with data', () => {
    const renderedComponent = render(
      <RD3PIE items={data} />
    );
    expect(renderedComponent.find(data[0].user.screen_name)).toExist();
  });
});

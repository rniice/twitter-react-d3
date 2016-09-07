import expect from 'expect';
import { shallow, mount } from 'enzyme';
import React from 'react';

import { AboutPage } from '../index';
import H1 from 'components/H1';

describe('<AboutPage />', () => {
  it('should render its heading', () => {
    const renderedComponent = shallow(
      <AboutPage />
    );
    expect(renderedComponent.contains(<H1>About</H1>)).toEqual(true);
  });

  it('should link to "/"', () => {
    const openRouteSpy = expect.createSpy();

    // Spy on the openRoute method of the FeaturePage
    const openRoute = (dest) => {
      if (dest === '/') {
        openRouteSpy();
      }
    };

    const renderedComponent = mount(
      <AboutPage changeRoute={openRoute} />
    );
    const button = renderedComponent.find('button');
    button.simulate('click');
    expect(openRouteSpy).toHaveBeenCalled();
  });
});

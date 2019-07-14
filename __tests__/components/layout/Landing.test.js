import React from 'react';
import { Link } from 'react-router-dom';
import { shallow } from 'enzyme';
import Landing from '../../../src/components/layout/Landing';

const shallowSetup = () => {
  const props = {
    messageHead: 'Banking, done right',
    messageBody:
      'Banka is the future of bank accounts management. We employ cutting edge technology to improve all facets of your financial life',
    optionalLink: (
      <Link to="/signup" className="auth-btn-side">
        Get Started
      </Link>
    )
  };

  const enzymeWrapper = shallow(<Landing {...props} />);

  return { props, enzymeWrapper };
};

describe('<Landing />', () => {
  it('Renders the Landing Page', () => {
    const { enzymeWrapper } = shallowSetup();
    expect(enzymeWrapper.find('img').length).toBe(4);
    expect(enzymeWrapper.find('WelcomeMessage').length).toBe(1);
  });
});

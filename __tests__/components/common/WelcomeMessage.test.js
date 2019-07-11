import React from 'react';
import { Link } from 'react-router-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import WelcomeMessage from '../../../src/components/common/WelcomeMessage';

describe('<WelcomeMessage />', () => {
  it('Renders the WelcomeMessage component', () => {
    const wrapper = shallow(
      <WelcomeMessage
        messageHead="Banking, done right"
        messageBody="Banka is the future of bank accounts management. We employ cutting edge technology
to improve all facets of your financial life"
        optionalLink={
          <Link to="/signup" className="auth-btn-side">
            Get Started
          </Link>
        }
      />
    );

    expect(toJson(wrapper)).toMatchSnapshot();

    expect(wrapper.find('h1.tag-heading').text()).toBe('Banking, done right');
  });
});

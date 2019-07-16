import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { SideNav } from '../../../src/components/common/SideNav';

const shallowSetup = () => {
  const props = {
    auth: {},
    history: { location: { pathname: '' } }
  };

  const enzymeWrapper = shallow(<SideNav {...props} />);

  return { props, enzymeWrapper };
};

describe('<SideNav', () => {
  const { props } = shallowSetup();
  it('Renders the Header component', () => {
    const wrapper = shallow(<SideNav {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

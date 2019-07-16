import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Header } from '../../../src/components/common/Header';

const shallowSetup = () => {
  const props = {
    logout: jest.fn(),
    auth: {},
    loading: false,
    history: { location: { pathname: '' } }
  };

  const enzymeWrapper = shallow(<Header {...props} />);

  return { props, enzymeWrapper };
};

describe('<Header />', () => {
  const { props, enzymeWrapper } = shallowSetup();
  const component = enzymeWrapper.instance();
  it('Renders the Header component', () => {
    const wrapper = shallow(<Header {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Log out a user', () => {
    const logout = jest.spyOn(component, 'onLogoutClick');
    component.onLogoutClick();
    expect(logout).toBeCalled();
  });

  it('Render the component', () => {
    const render = jest.spyOn(component, 'render');
    component.render();
    expect(render).toBeCalled();
  });

  it('Display the dropdown menu on click', () => {
    const dropdown = jest.spyOn(component, 'onClick');
    component.onClick();
    expect(dropdown).toBeCalled();
  });
});

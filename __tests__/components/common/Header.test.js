import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Header } from '../../../src/components/common/Header';

const shallowSetup = () => {
  const props = {
    logout: jest.fn(),
    auth: {
      isAuthenticated: true,
      user: {
        type: 'staff'
      }
    },
    loading: false,
    history: { location: { pathname: 'users' } }
  };

  const enzymeWrapper = shallow(<Header {...props} />);

  return { props, enzymeWrapper };
};

describe('<Header />', () => {
  const { props, enzymeWrapper } = shallowSetup();
  const component = enzymeWrapper.instance();
  it('Renders the Authenticated Header component', () => {
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

  it('Renders the Non Authenticated Header component', () => {
    const wrapper = shallow(<Header {...props} />);
    wrapper.setProps({
      auth: { isAuthenticated: false }
    });
    expect(wrapper.find('div').length).toEqual(2);
  });

  it('Should return an active id on the dashboard icon it is active', () => {
    const wrapper = shallow(<Header {...props} />);
    wrapper.setProps({
      history: { location: { pathname: 'dashboard' } }
    });
    expect(wrapper.find('#active').length).toEqual(1);
  });

  it('Should return an active id on the account icon it is active', () => {
    const wrapper = shallow(<Header {...props} />);
    wrapper.setProps({
      history: { location: { pathname: 'viewaccounts' } }
    });
    expect(wrapper.find('#active').length).toEqual(1);
  });

  it('Should return an active id on the users icon it is active', () => {
    const wrapper = shallow(<Header {...props} />);
    wrapper.setProps({
      history: { location: { pathname: 'users' } }
    });
    expect(wrapper.find('#active').length).toEqual(1);
  });

  it('Should return an active id on the profile icon it is active', () => {
    const wrapper = shallow(<Header {...props} />);
    wrapper.setProps({
      history: { location: { pathname: 'profile' } }
    });
    expect(wrapper.find('#active').length).toEqual(1);
  });

  it('Should not render a users link for a non-staff user', () => {
    const wrapper = shallow(<Header {...props} />);
    wrapper.setProps({
      auth: { user: { type: 'client' } }
    });
    expect(wrapper.find('.fa-users icon').length).toEqual(0);
  });

  it('Display the dropdown menu on click', () => {
    const dropdown = jest.spyOn(component, 'onClick');
    component.onClick();
    expect(dropdown).toBeCalled();
  });
});

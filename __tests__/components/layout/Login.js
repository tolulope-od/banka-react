import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Login } from '../../../src/components/layout/Login';

const shallowSetup = () => {
  const props = {
    messageHead: 'Banking, done right',
    messageBody: 'Welcome back, we missed you',
    optionalLink: '',
    login: jest.fn(),
    errors: {},
    auth: {},
    onChange: jest.fn(),
    onSubmit: jest.fn(),
    loading: false
  };

  const enzymeWrapper = shallow(<Login {...props} />);

  return { props, enzymeWrapper };
};

describe('<Login />', () => {
  const { enzymeWrapper } = shallowSetup();
  const component = enzymeWrapper.instance();
  it('Renders the Login Page', () => {
    expect(enzymeWrapper.find('Input').length).toBe(3);
    expect(enzymeWrapper.find('WelcomeMessage').length).toBe(1);
  });

  it('Should change the email in local state', () => {
    const e = {
      target: {
        name: 'email',
        value: 'obiwan@therebellion.com'
      }
    };
    component.onChange(e);
    expect(component.state.email).toEqual('obiwan@therebellion.com');
  });

  it('Should change the email in local state', () => {
    const e = {
      target: {
        name: 'password',
        value: 'password123'
      }
    };
    component.onChange(e);
    expect(component.state.password).toEqual('password123');
  });

  it('Should log a user in', () => {
    const login = jest.spyOn(component, 'onSubmit');
    component.onSubmit({ preventDefault: () => 1 });
    expect(login).toBeCalled();
  });

  it('Should change the displayed component if the user information is loading', () => {
    const loading = jest.spyOn(component, 'renderLoading');
    const { loadingGIF } = component.renderLoading();

    expect(toJson(loadingGIF)).toMatchSnapshot();
    expect(loading).toBeCalled();
  });
});

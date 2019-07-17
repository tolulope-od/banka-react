import React from 'react';
import { shallow } from 'enzyme';
import { Register } from '../../../src/components/layout/Register';

const shallowSetup = () => {
  const props = {
    messageHead: 'Banking, done right',
    messageBody: 'Welcome back, we missed you',
    optionalLink: '',
    signUp: jest.fn(),
    errors: {},
    auth: {},
    onChange: jest.fn(),
    onSubmit: jest.fn(),
    loading: false
  };

  const enzymeWrapper = shallow(<Register {...props} />);

  return { props, enzymeWrapper };
};

describe('<Register /> Component', () => {
  const { enzymeWrapper } = shallowSetup();
  const component = enzymeWrapper.instance();
  it('Renders the Register Page without crashing', () => {
    expect(enzymeWrapper.find('Input').length).toBe(6);
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

  it('Should change the first name in local state', () => {
    const e = {
      target: {
        name: 'firstName',
        value: 'Obiwan'
      }
    };
    component.onChange(e);
    expect(component.state.firstName).toEqual('Obiwan');
  });

  it('Should change the last name in local state', () => {
    const e = {
      target: {
        name: 'lastName',
        value: 'Kenobi'
      }
    };
    component.onChange(e);
    expect(component.state.lastName).toEqual('Kenobi');
  });

  it('Should change the confirm password field in local state', () => {
    const e = {
      target: {
        name: 'password2',
        value: 'password123'
      }
    };
    component.onChange(e);
    expect(component.state.password2).toEqual('password123');
  });

  it('Should register a new user', () => {
    const signUp = jest.spyOn(component, 'onSubmit');
    component.onSubmit({ preventDefault: () => 1 });
    expect(signUp).toBeCalled();
  });
});

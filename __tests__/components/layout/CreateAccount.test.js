import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { CreateAccount } from '../../../src/components/layout/CreateAccount';

const shallowSetup = () => {
  const props = {
    auth: {
      isAuthenticated: true,
      user: {
        firstName: 'Test',
        lastName: 'User'
      }
    },
    account: {
      accountLoading: false,
      account: {}
    },
    createBankAccount: jest.fn(),
    errors: {}
  };

  const enzymeWrapper = shallow(<CreateAccount {...props} />);

  return { props, enzymeWrapper };
};

describe('<CreateAccount /> Component', () => {
  const { enzymeWrapper } = shallowSetup();
  const component = enzymeWrapper.instance();

  it('renders the create account page', () => {
    expect(enzymeWrapper.find('.shortcut-btns').length).toBe(1);
    expect(enzymeWrapper.find('Link').length).toBe(1);
    expect(enzymeWrapper.find('Card').length).toBe(1);
  });

  it('should set the state when the component is updated', () => {
    enzymeWrapper.setProps({ errors: { error: 'Something happened' } });
    expect(component.state.errors.error).toEqual('Something happened');
    expect(component.state.isOpen).toEqual(true);
  });

  it('should change the account type in local state', () => {
    const e = {
      target: {
        name: 'accountType',
        value: 'current'
      }
    };
    component.onChange(e);
    expect(component.state.type).toEqual('current');
  });

  it('should create an account when the button is clicked', () => {
    const createAccount = jest.spyOn(component, 'onSubmit');
    component.onSubmit({ preventDefault: () => 1 });
    expect(createAccount).toBeCalled();
  });

  it('should set the state when an account is created', () => {
    const newAccount = {
      id: 35,
      accountnumber: '6407771369',
      owner: 5,
      ownername: 'Joy Machido',
      type: 'savings',
      status: 'active',
      balance: '0.0',
      owneremail: 'joy.machido@gmail.com',
      createdon: '2019-08-20T13:22:41.935Z'
    };
    enzymeWrapper.setProps({
      account: {
        account: newAccount
      }
    });
    expect(component.state.account).toEqual(newAccount);
  });

  it('should call the onClick function', () => {
    const clickAction = jest.spyOn(component, 'onClick');
    component.onClick({ target: { id: 'modal' } });
    expect(clickAction).toBeCalled();
  });

  it('should close the modal when the close button is clicked', () => {
    const e = {
      target: {
        id: 'close-button'
      }
    };
    component.onClick(e);
    expect(component.state.isOpen).toEqual(false);
  });

  it('should close the modal when the submit button is clicked', () => {
    const e = {
      target: {
        id: 'submit-btn'
      }
    };
    component.onClick(e);
    expect(component.state.isOpen).toEqual(false);
  });

  it('should close the modal when any area outside the modal is clicked', () => {
    const e = {
      target: {
        id: 'myModal'
      }
    };
    component.onClick(e);
    expect(component.state.isOpen).toEqual(false);
  });

  it('Should change the content in the modal if the account information is loading', () => {
    const displayedModal = jest.spyOn(component, 'modalDisplay');
    const modal = component.modalDisplay();

    expect(toJson(modal)).toMatchSnapshot();
    expect(displayedModal).toBeCalled();
  });
});

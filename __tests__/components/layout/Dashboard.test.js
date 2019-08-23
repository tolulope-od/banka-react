import '@babel/polyfill';
import React from 'react';
import { shallow } from 'enzyme';
import { Dashboard } from '../../../src/components/layout/Dashboard';

const shallowSetup = () => {
  const props = {
    auth: {
      isAuthenticated: true,
      user: {
        firstName: 'Test',
        lastName: 'User',
        type: 'client'
      }
    },
    account: {
      accountLoading: false,
      accounts: [
        {
          id: 6,
          accountnumber: '6993007299',
          owner: 5,
          ownername: 'Joy Machido',
          type: 'current',
          status: 'active',
          balance: '0.0',
          owneremail: 'joy.machido@gmail.com',
          createdon: '2019-07-17T15:11:08.000Z'
        },
        {
          id: 7,
          accountnumber: '8896255470',
          owner: 5,
          ownername: 'Joy Machido',
          type: 'current',
          status: 'active',
          balance: '0.0',
          owneremail: 'joy.machido@gmail.com',
          createdon: '2019-07-18T12:06:57.839Z'
        },
        {
          id: 8,
          accountnumber: '8425966406',
          owner: 5,
          ownername: 'Joy Machido',
          type: 'current',
          status: 'active',
          balance: '0.0',
          owneremail: 'joy.machido@gmail.com',
          createdon: '2019-07-18T12:10:27.040Z'
        }
      ]
    },
    fetchBankAccounts: jest.fn(),
    errors: {}
  };

  const enzymeWrapper = shallow(<Dashboard {...props} />);

  return { props, enzymeWrapper };
};

describe('<Dashboard /> Component', () => {
  const { enzymeWrapper } = shallowSetup();
  const component = enzymeWrapper.instance();

  it('renders the create account page', () => {
    expect(enzymeWrapper.find('.shortcut-btns').length).toBe(1);
    expect(enzymeWrapper.find('Link').length).toBe(1);
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
});

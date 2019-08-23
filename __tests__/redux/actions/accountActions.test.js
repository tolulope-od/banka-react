import '@babel/polyfill';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import API_URL from '../../../src/utils/API';
import createAccount, { fetchBankAccounts } from '../../../src/redux/actions/accountActions';
import {
  ADD_BANK_ACCOUNT,
  ACCOUNT_ACTION_LOADING,
  CLEAR_ERRORS,
  GET_ERRORS,
  FETCH_ALL_BANK_ACCOUNTS
} from '../../../src/redux/actions/types';

const mockStore = configureMockStore([thunk]);
const mockAccountType = { type: 'savings' };

describe('Bank Account Creation Test', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should create a new bank account for a user', async done => {
    const action = [
      {
        type: ACCOUNT_ACTION_LOADING,
        payload: true
      },
      {
        type: CLEAR_ERRORS
      },
      {
        type: ADD_BANK_ACCOUNT,
        payload: {
          id: 35,
          accountnumber: '6407771369',
          owner: 5,
          ownername: 'Joy Machido',
          type: 'savings',
          status: 'active',
          balance: '0.0',
          owneremail: 'joy.machido@gmail.com',
          createdon: '2019-08-20T13:22:41.935Z'
        }
      }
    ];

    moxios.stubRequest(`${API_URL}/accounts`, {
      status: 201,
      response: {
        status: 201,
        data: [
          {
            accountNumber: '6407771369',
            firstName: 'Joy',
            lastName: 'Machido',
            email: 'joy.machido@gmail.com',
            type: 'savings',
            openingBalance: '0.0',
            newAccount: {
              id: 35,
              accountnumber: '6407771369',
              owner: 5,
              ownername: 'Joy Machido',
              type: 'savings',
              status: 'active',
              balance: '0.0',
              owneremail: 'joy.machido@gmail.com',
              createdon: '2019-08-20T13:22:41.935Z'
            }
          }
        ],
        message: 'Account created successfully'
      }
    });

    const store = mockStore();
    await store.dispatch(createAccount(mockAccountType));
    expect(store.getActions()).toEqual(action);
    done();
  });

  it('should not create an account when the type isnt specified', async done => {
    const actions = [
      { type: ACCOUNT_ACTION_LOADING, payload: true },
      { type: CLEAR_ERRORS },
      { type: ACCOUNT_ACTION_LOADING, payload: false },
      { type: GET_ERRORS, payload: { status: 400, error: 'Account type is required' } }
    ];

    moxios.stubRequest(`${API_URL}/accounts`, {
      status: 400,
      response: {
        status: 400,
        error: 'Account type is required'
      }
    });

    const store = mockStore();
    await store.dispatch(createAccount(mockAccountType));
    expect(store.getActions()).toEqual(actions);
    done();
  });
});

describe('Fetching Bank Accounts Actions Test', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  const accounts = [
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
  ];

  it('should fetch all bank accounts when the action is called', async done => {
    const actions = [
      { type: ACCOUNT_ACTION_LOADING, payload: true },
      { type: CLEAR_ERRORS },
      { type: FETCH_ALL_BANK_ACCOUNTS, payload: accounts }
    ];

    moxios.stubRequest(`${API_URL}/accounts`, {
      status: 200,
      response: {
        status: 20,
        data: [...accounts],
        message: 'Account created successfully'
      }
    });

    const store = mockStore();
    await store.dispatch(fetchBankAccounts());
    expect(store.getActions()).toEqual(actions);
    done();
  });

  it('should dispatch an error if if occurs while fetching accounts', async done => {
    const actions = [
      { type: ACCOUNT_ACTION_LOADING, payload: true },
      { type: CLEAR_ERRORS },
      { type: ACCOUNT_ACTION_LOADING, payload: false },
      {
        type: GET_ERRORS,
        payload: { status: 500, error: 'Oops! An error occured, please checkback for a fix' }
      }
    ];

    moxios.stubRequest(`${API_URL}/accounts`, {
      status: 500,
      response: {
        status: 500,
        error: 'Oops! An error occured, please checkback for a fix'
      }
    });

    const store = mockStore();
    await store.dispatch(fetchBankAccounts());
    expect(store.getActions()).toEqual(actions);
    done();
  });
});

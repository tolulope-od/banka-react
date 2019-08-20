import accountReducer, { initialState } from '../../../src/redux/reducers/accountReducer';
import { ACCOUNT_ACTION_LOADING, ADD_BANK_ACCOUNT } from '../../../src/redux/actions/types';

describe('Account Reducer Tests', () => {
  it('should return the initial state', () => {
    expect(accountReducer(undefined, {})).toMatchSnapshot();
  });

  it('Should set the loading state when account information is being requested', () => {
    const payload = true;
    expect(accountReducer(initialState, { type: ACCOUNT_ACTION_LOADING, payload })).toEqual({
      account: {},
      accountLoading: true,
      accounts: []
    });
  });

  it('should add a newly created account to the state', () => {
    const payload = {
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
    expect(accountReducer(initialState, { type: ADD_BANK_ACCOUNT, payload })).toEqual({
      account: payload,
      accountLoading: false,
      accounts: [payload]
    });
  });
});

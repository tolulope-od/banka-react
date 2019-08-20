import { ACCOUNT_ACTION_LOADING, ADD_BANK_ACCOUNT } from '../actions/types';

export const initialState = {
  account: {},
  accounts: [],
  accountLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_ACTION_LOADING:
      return {
        ...state,
        accountLoading: action.payload
      };
    case ADD_BANK_ACCOUNT:
      return {
        ...state,
        account: action.payload,
        accounts: [action.payload, ...state.accounts],
        accountLoading: false
      };
    default:
      return state;
  }
};

import axios from 'axios';
import { ACCOUNT_ACTION_LOADING, ADD_BANK_ACCOUNT, FETCH_ALL_BANK_ACCOUNTS } from './types';
import { clearErrors, getErrors } from './errorActions';
import API_URL from '../../utils/API';

const createBankAccount = type => {
  return async dispatch => {
    dispatch({ type: ACCOUNT_ACTION_LOADING, payload: true });
    try {
      dispatch(clearErrors());
      const createdAccount = await axios.post(`${API_URL}/accounts`, { type });
      const { newAccount } = createdAccount.data.data[0];
      return dispatch({ type: ADD_BANK_ACCOUNT, payload: newAccount });
    } catch (err) {
      dispatch({ type: ACCOUNT_ACTION_LOADING, payload: false });
      return dispatch(getErrors(err.response.data));
    }
  };
};

export const fetchBankAccounts = () => {
  return async dispatch => {
    dispatch({ type: ACCOUNT_ACTION_LOADING, payload: true });
    try {
      dispatch(clearErrors());
      const allAccounts = await axios.get(`${API_URL}/accounts`);
      const { data } = allAccounts.data;
      dispatch({ type: FETCH_ALL_BANK_ACCOUNTS, payload: data });
      return data;
    } catch (err) {
      dispatch({ type: ACCOUNT_ACTION_LOADING, payload: false });
      return dispatch(getErrors(err.response.data));
    }
  };
};

export default createBankAccount;

import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';
import { SET_USER, USER_LOADING } from './types';
import { clearErrors, getErrors } from './errorActions';
import API_URL from '../../utils/API';

export const setUser = decoded => ({ type: SET_USER, payload: decoded });

export const login = userData => {
  return async dispatch => {
    dispatch({ type: USER_LOADING, payload: true });
    try {
      dispatch(clearErrors());
      const returningUser = await axios.post(`${API_URL}/auth/signin`, userData);
      const { token } = returningUser.data.data[0];
      setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(setUser(decoded));
      return dispatch({ type: USER_LOADING, payload: false });
    } catch (err) {
      dispatch({ type: USER_LOADING, payload: false });
      return dispatch(getErrors(err.response.data));
    }
  };
};

export const signUp = (userData, history) => {
  return async dispatch => {
    dispatch({ type: USER_LOADING, payload: true });
    try {
      dispatch(clearErrors());
      const newUser = await axios.post(`${API_URL}/auth/signup`, userData);
      const { token } = newUser.data.data[0];
      setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(setUser(decoded));
      dispatch({ type: USER_LOADING, payload: false });
      return history.push('/createAccount');
    } catch (err) {
      dispatch({ type: USER_LOADING, payload: false });
      return dispatch(getErrors(err.response.data));
    }
  };
};

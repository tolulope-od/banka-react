import isEmpty from '../../utils/isEmpty';
import { SET_USER, USER_LOADING } from '../actions/types';

export const initialState = {
  isAuthenticated: false,
  loading: false,
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};

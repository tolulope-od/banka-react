import authReducer, { initialState } from '../../../src/redux/reducers/authReducer';
import { SET_USER, USER_LOADING } from '../../../src/redux/actions/types';

describe('Auth Reducer Tests', () => {
  it('Should return the initial state', () => {
    expect(authReducer(undefined, {})).toMatchSnapshot();
  });

  it('Should add an authenticated user to the state', () => {
    const payload = {
      id: 4,
      email: 'palpatine@therebellion.com',
      type: 'staff',
      firstName: 'Emperor',
      lastName: 'Palpatine',
      isAdmin: true,
      iat: 1563124880,
      exp: 1563128480
    };

    expect(authReducer(initialState, { type: SET_USER, payload })).toEqual({
      user: payload,
      isAuthenticated: true,
      loading: false
    });
  });

  it('Should set the loading state when user information is being requested', () => {
    const payload = true;
    expect(authReducer(initialState, { type: USER_LOADING, payload })).toEqual({
      loading: true,
      isAuthenticated: false,
      user: {}
    });
  });
});

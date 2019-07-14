import '@babel/polyfill';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import API_URL from '../../../src/utils/API';
import { login } from '../../../src/redux/actions/authActions';
import { SET_USER, USER_LOADING, CLEAR_ERRORS, GET_ERRORS } from '../../../src/redux/actions/types';

const mockStore = configureMockStore([thunk]);
const mockLogin = { email: 'palpatine@theempire.com', password: 'SithLord1' };

describe('Auth Actions Test', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('Should login an existing user', async done => {
    const action = [
      {
        type: USER_LOADING,
        payload: true
      },
      {
        type: CLEAR_ERRORS
      },
      {
        type: SET_USER,
        payload: {
          id: 1,
          email: 'obiwan@therebellion.com',
          type: 'staff',
          firstName: 'Obiwan',
          lastName: 'Kenobi',
          isAdmin: true,
          iat: 1563124880,
          exp: 1563128480
        }
      },
      {
        type: USER_LOADING,
        payload: false
      }
    ];

    moxios.stubRequest(`${API_URL}/auth/signin`, {
      status: 200,
      response: {
        status: 200,
        data: [
          {
            token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJvYml3YW5AdGhlcmViZWxsaW9uLmNvbSIsInR5cGUiOiJzdGFmZiIsImZpcnN0TmFtZSI6Ik9iaXdhbiIsImxhc3ROYW1lIjoiS2Vub2JpIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNTYzMTI0ODgwLCJleHAiOjE1NjMxMjg0ODB9.qhtHoRQJHhVA2EzLL631umCpjrDW7a5qlOVfSt3Dj-c'
          }
        ],
        message: 'Login successful'
      }
    });

    const store = mockStore();
    await store.dispatch(login(mockLogin));
    expect(store.getActions()).toEqual(action);
    done();
  });

  it('Should not sign in a user with wrong details', async done => {
    const actions = [
      { type: USER_LOADING, payload: true },
      { type: CLEAR_ERRORS },
      { type: USER_LOADING, payload: false },
      { type: GET_ERRORS, payload: { status: 404, error: 'Email or password is incorrect' } }
    ];

    moxios.stubRequest(`${API_URL}/auth/signin`, {
      status: 404,
      response: {
        status: 404,
        error: 'Email or password is incorrect'
      }
    });

    const store = mockStore();
    await store.dispatch(login(mockLogin));
    expect(store.getActions()).toEqual(actions);
    done();
  });
});

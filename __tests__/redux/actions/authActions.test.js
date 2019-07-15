import '@babel/polyfill';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import API_URL from '../../../src/utils/API';
import { login, signUp } from '../../../src/redux/actions/authActions';
import { SET_USER, USER_LOADING, CLEAR_ERRORS, GET_ERRORS } from '../../../src/redux/actions/types';

const mockStore = configureMockStore([thunk]);
const mockLogin = { email: 'palpatine@theempire.com', password: 'SithLord1' };
const mockSignUp = {
  email: 'joy.machido@gmail.com',
  password: 'Password123',
  firstName: 'Joy',
  lastName: 'Machido'
};

const props = {
  history: { push: value => value }
};

describe('Auth Actions Test', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  jest.setTimeout(10000);

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

  it('Should register a new user', async done => {
    const actions = [
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
          id: 5,
          email: 'joy.machido@gmail.com',
          type: 'client',
          firstName: 'Joy',
          lastName: 'Machido',
          isAdmin: false,
          iat: 1563197123,
          exp: 1563200723
        }
      },
      {
        type: USER_LOADING,
        payload: false
      }
    ];

    moxios.stubRequest(`${API_URL}/auth/signup`, {
      status: 200,
      response: {
        status: 200,
        data: [
          {
            token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJqb3kubWFjaGlkb0BnbWFpbC5jb20iLCJ0eXBlIjoiY2xpZW50IiwiZmlyc3ROYW1lIjoiSm95IiwibGFzdE5hbWUiOiJNYWNoaWRvIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU2MzE5NzEyMywiZXhwIjoxNTYzMjAwNzIzfQ.S6BgcFRqSAAeMC0n2grO4kLBzEQvjr81HfF6WuZuVmQ'
          }
        ],
        message: 'Registration successful'
      }
    });

    const store = mockStore();
    await store.dispatch(signUp(mockSignUp, props.history));
    expect(store.getActions()).toEqual(actions);
    done();
  });

  it('Should not register a user with wrong details', async done => {
    const actions = [
      { type: USER_LOADING, payload: true },
      { type: CLEAR_ERRORS },
      { type: USER_LOADING, payload: false },
      { type: GET_ERRORS, payload: { status: 409, error: 'User already exists' } }
    ];

    moxios.stubRequest(`${API_URL}/auth/signup`, {
      status: 409,
      response: {
        status: 409,
        error: 'User already exists'
      }
    });

    const store = mockStore();
    await store.dispatch(signUp(mockSignUp, props.history));
    expect(store.getActions()).toEqual(actions);
    done();
  });
});

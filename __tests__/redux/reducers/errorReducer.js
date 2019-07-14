import errorReducer, { initialState } from '../../../src/redux/reducers/errorReducer';
import { GET_ERRORS, CLEAR_ERRORS } from '../../../src/redux/actions/types';

describe('Error Reducer Tests', () => {
  it('Should return the initial state', () => {
    expect(errorReducer(undefined, {})).toMatchSnapshot();
  });

  it('Should add a new error to the state', () => {
    const payload = {
      status: 404,
      error: 'Account not found'
    };

    expect(errorReducer(initialState, { type: GET_ERRORS, payload })).toEqual(payload);
  });

  it('Should clear the errors in the state', () => {
    expect(errorReducer(initialState, { type: CLEAR_ERRORS })).toEqual({});
  });
});

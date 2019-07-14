import configureMockStore from 'redux-mock-store';
import { getErrors, clearErrors } from '../../../src/redux/actions/errorActions';

const mockStore = configureMockStore();
const store = mockStore({});

describe('Error action creators', () => {
  it('creates a GET_ERRORS action whenever an error occurs', () => {
    store.dispatch(
      getErrors({
        status: 404,
        error: 'Account not found!'
      })
    );
    expect(store.getActions()).toMatchSnapshot();
  });

  it('creates a CLEAR_ERRORS action to clear the errors', () => {
    store.dispatch(clearErrors());
    expect(store.getActions()).toMatchSnapshot();
  });
});

import jwtDecode from 'jwt-decode';
import store from '../redux/index';
import setAuthToken from './setAuthToken';
import { setUser, logout } from '../redux/actions/authActions';

const checkToken = () => {
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwtDecode(localStorage.jwtToken);
    store.dispatch(setUser(decoded));

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = '/login';
    }
  }
};

export default checkToken;

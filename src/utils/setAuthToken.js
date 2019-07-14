import axios from 'axios';

export default token => {
  if (token) {
    return (axios.defaults.headers.common['Authorization'] = token);
  }
  return delete axios.defaults.headers.common['Authorization'];
};

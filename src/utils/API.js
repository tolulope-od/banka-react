const isDev = process.env.NODE_ENV === 'development';

const API_URL = isDev ? 'http://localhost:5000/api/v1' : 'https://bankaa-app.herokuapp.com/api/v1';

export default API_URL;

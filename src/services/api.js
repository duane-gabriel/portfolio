import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/',
});

const token = `Bearer ${JSON.parse(localStorage.getItem('vuex')).user.token}`;

api.defaults.headers.common.Authorization = token;
// api.defaults.headers.common['Content-type'] = 'application/json';

export default api;

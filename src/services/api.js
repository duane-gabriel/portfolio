import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/',
});

const { user } = JSON.parse(localStorage.getItem('vuex'));

if (user) {
  const token = `Bearer ${user.token}`;
  console.log(token, 'token');
  api.defaults.headers.common.Authorization = token;
}

// api.defaults.headers.common['Content-type'] = 'application/json';

export default api;

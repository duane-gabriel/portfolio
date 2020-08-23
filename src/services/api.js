/*eslint-disable*/
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/',
});

api.interceptors.request.use(
  (config) => {
    const { user } = JSON.parse(window.localStorage.vuex);
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// api.interceptors.response.use(
//   (config) => config,
//   function (error) {
//     const obj = { menuIsActive: 'home', user: null };
//     localStorage.setItem('vuex', JSON.stringify(obj));
//     location.reload();
//     return Promise.reject(error);
//   }
// );

export default api;

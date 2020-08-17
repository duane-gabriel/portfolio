import Vue from 'vue';
import axios from 'axios';

/* eslint-disable */
Vue.use({
  install(Vue) {
    Vue.prototype.$http = axios.create({
      baseURL: 'http://localhost:3000/',
    });
  },
});

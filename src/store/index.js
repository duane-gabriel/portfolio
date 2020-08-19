import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import axios from 'axios';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default new Vuex.Store({
  state: {
    menuIsActive: 'home',
    user: null,
  },
  mutations: {
    setMenu(state, { payLoad }) {
      state.menuIsActive = payLoad.menuItem;
    },
    SET_USER_DATA(state, payLoad) {
      state.user = payLoad.data.user;
      axios.defaults.headers.common.Authorization = `Bearer ${state.user.token}`;
    },
  },
  actions: {
    SET_MENU(context, payLoad) {
      context.commit('setMenu', payLoad);
    },
    LOGIN({ commit }, payLoad) {
      return axios
        .post('http://localhost:3000/session', payLoad.credentials)
        .then(({ data }) => commit('SET_USER_DATA', { data }));
    },
  },
  modules: {},
  plugins: [vuexLocal.plugin],
});

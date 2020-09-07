import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menuIsActive: 'home',
    user: null,
    files: [],
    menuAdmin: 'Projetos',
  },
  mutations: {
    setMenu(state, { payLoad }) {
      state.menuIsActive = payLoad.menuItem;
    },
    SET_USER_DATA(state, payLoad) {
      state.user = payLoad.data.user;
      axios.defaults.headers.common.Authorization = `Bearer ${state.user.token}`;
    },
    CLEAR_USER_DATA(state) {
      state.user = null;
      localStorage.removeItem('vuex');
      location.reload(); /*eslint-disable-line*/
    },
    SET_MENU_ADMIN(state, { menuAdmin }) {
      state.menuAdmin = menuAdmin;
    },
  },
  actions: {
    SET_MENU(context, payLoad) {
      context.commit('setMenu', payLoad);
    },
    LOGIN({ commit }, payLoad) {
      return axios
        .post(`${process.env.VUE_APP_API_URL}session`, payLoad.credentials)
        .then(({ data }) => commit('SET_USER_DATA', { data }));
    },
    saveProject(context, { project }) {
      axios
        .post(`${process.env.VUE_APP_API_URL}projects`, project)
        .then()
        .catch((e) => console.log(e));
    },
    logout({ commit }) {
      commit('CLEAR_USER_DATA');
    },
    setMenuAdmin({ commit }, { menuAdmin }) {
      commit('SET_MENU_ADMIN', { menuAdmin });
    },
  },
  modules: {},
  plugins: [createPersistedState()],
});

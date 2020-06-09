import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menuIsActive: 'home',
  },
  mutations: {
    setMenu(state, { payLoad }) {
      // console.log(payLoad.payLoad.menuItem);
      state.menuIsActive = payLoad.menuItem;
    },
  },
  actions: {
    SET_MENU(context, payLoad) {
      context.commit('setMenu', payLoad);
    },
  },
  modules: {
  },
});

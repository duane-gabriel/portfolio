import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

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
  plugins: [vuexLocal.plugin],
});

import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import store from './store';
import './axios';

Vue.directive('click-outside', {
  bind() {
    this.event = (event) => this.vm.$emit(this.expression, event);
    this.el.addEventListener('click', this.stopProp);
    document.body.addEventListener('click', this.event);
  },

  stopProp(event) {
    event.stopPropagation();
  },
});

library.add(faUserSecret);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

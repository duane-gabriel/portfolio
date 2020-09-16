import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { VuejsDatatableFactory } from 'vuejs-datatable';
import Vuelidate from 'vuelidate';
import messageService from 'vue-update-message';
import VueHead from 'vue-head';

import App from './App.vue';
import router from './router';
import store from './store';

import 'bootstrap';
import './assets/css/style.scss';

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

Vue.use(VuejsDatatableFactory);

Vue.use(Vuelidate);

Vue.use(VueHead);

Vue.use(messageService);

library.add(faUserSecret);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  Vuelidate,
  render: (h) => h(App),
}).$mount('#app');

import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Resume from '../views/Resume.vue';
import Projects from '../views/Projects.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/curriculo',
    name: 'Resume',
    component: Resume,
  },
  {
    path: '/rojects',
    name: 'Projects',
    component: Projects,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

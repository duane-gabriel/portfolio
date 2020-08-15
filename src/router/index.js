import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Resume from '../views/Resume.vue';
import Projects from '../views/Projects.vue';
import Login from '../views/Login.vue';

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
    path: '/projetos',
    name: 'Projects',
    component: Projects,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

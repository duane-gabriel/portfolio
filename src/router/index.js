import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Resume from '../views/Resume.vue';
import Projects from '../views/Projects.vue';
import Login from '../views/Login.vue';
import Admin from '../views/Admin.vue';
import projects from '../components/projects.vue';
import tags from '../components/tags.vue';

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
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        component: projects,
        name: 'Admin.projects',
      },
      {
        path: 'tags',
        component: tags,
        name: 'Admin.tags',
      },
    ],
  },
];
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  const state = localStorage.getItem('vuex');
  const loggedIn = JSON.parse(state);
  if (loggedIn.user.token) {
    next('/');
  } else {
    next();
  }
});

export default router;

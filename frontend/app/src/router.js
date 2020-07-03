import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Login',
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (repo-page.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "repo-page" */ './views/Login')
    },
    {
      path: '/Register',
      name: 'Register',
      // route level code-splitting
      // this generates a separate chunk (repo-page.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "repo-page" */ './views/Register')
    },
    {
      path: '/Logout',
      name: 'Logout',
      component: () => import('./views/Logout')
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: () => import('./views/Dashboard')
    },
    {
      path: '*',
      name: '404',
      component: Home
    }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/Login', '/Register', '/'];
  const nonAuthPages = ['/Login', '/Register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    if (to.path === '/Logout') {
      return next('/');
    }
    if (to.path === '/Dashboard' && from.path === '/') {
      return next('/');
    }
    if (to.path === '/Register' && from.path === '/Login') {
      return next('/Register');
    }
    return next('/Login');
  }

  //If Logged in and trying to access login/register then redirect to home.
  if (loggedIn && nonAuthPages.includes(to.path)) {
    return next('/');
  }

  next();
});

export default router;

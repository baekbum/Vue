import Vue from "vue";
import Router from "vue-router";
import MainLayout from "../layout/MainLayout";
import Dashboard from "../views/dashboard/Dashboard";
import Admin from "../views/admin/Admin";
import Login from "../views/Login";
import Register from "../views/Register";

Vue.use(Router);

const router = new Router({

  //mode: 'history',
  //base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      redirect: 'dashboard',
      component: MainLayout,
      children: [
        {
          path: '/dashboard', 
          name: 'dashboard',
          component: Dashboard
        },
        {
          path: '/admin',
          name: 'admin',
          component: Admin
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }    
  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ['login','register'];
  const authRequired = !publicPages.includes(to.name);
  const loggedIn = localStorage.getItem('user');
  
  if (authRequired && !loggedIn) {
    router.push({ name: 'login'});
  } else {
    next();
  }

  next();

});


export default router;

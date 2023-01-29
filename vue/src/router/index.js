import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import TestUi from '../views/TestUi.vue';
import Register from '../views/Register.vue';
import Dashboard from '../views/Dashboard.vue';
import ForgotPassword from '../views/ForgotPassword.vue';
import ResetPassword from '../views/ResetPassword.vue';
import SurveyView from '../views/SurveyView.vue';
import Surveys from '../views/Surveys.vue';
import SurveyPublicView from '../views/SurveyPublicView.vue';
import DefaultLayout from '../components/DefaultLayout.vue';
import AuthLayout from '../components/AuthLayout.vue';
import store from '../store';
const routes =  [
  {
    path: '/',
    redirect: '/dashboard',
    meta: {requiresAuth:true},
    component: DefaultLayout,
    children: [
      {
        path:'/dashboard', name: 'Dashboard', component: Dashboard
      },
      {
        path:'/surveys', name: 'Survey', component: Surveys
      },
      {
        path:'/surveys/create', name: 'SurveyCreate', component: SurveyView
      },
      {
        path:'/surveys/:id', name: 'SurveyView', component: SurveyView
      }
    ]
  },
  {
    path: '/view/survey/:slug', name: 'SurveyPublicView', component: SurveyPublicView
  }, {
    path: '/test-ui', component: TestUi
  }
  ,
  {
    path: '/auth',
    redirect: '/login',
    component: AuthLayout,
    meta: { isGuest: true },
    children: [
      {
        path: '/login', name: 'Login', component: Login
      },
      {
        path: '/register', name: 'Register', component: Register
      },
      {
        path: '/forgot-password', name:'ForgotPassword', component: ForgotPassword
      },
      {
        path: '/reset-password/:token', name: 'ResetPassword', component: ResetPassword
      }      
    ]
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth && !store.state.user.token){
    next({ name: 'Login' });
  }else if(store.state.user.token && to.meta.isGuest) {
    next({ name: 'Dashboard'});
  }else {
    next();
  }
})

export default router

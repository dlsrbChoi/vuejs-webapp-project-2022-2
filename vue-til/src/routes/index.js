import Vue from 'vue';
import Router from 'vue-router';
import LoginPage from '@/views/LoginPage';
import SignupPage from '@/views/SignupPage';
import MainPage from '@/views/MainPage';
import PostAddPage from '@/views/PostAddPage';
import PostEditPage from '@/views/PostEditPage';
import NotFoundPage from '@/views/NotFoundPage';
import store from '@/store/index';
import { getUserFromCookie } from '@/utils/cookies.js';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      beforeEnter(to, from, next) {
        store.getters['isLoggedIn'] ? next('/main') : next();
      },
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupPage,
    },
    {
      path: '/main',
      name: 'main',
      component: MainPage,
      beforeEnter,
    },
    {
      path: '/new',
      name: 'new',
      component: PostAddPage,
      beforeEnter,
    },
    {
      path: '/post/:id',
      name: 'detail',
      component: PostEditPage,
      beforeEnter,
    },
    {
      path: '*',
      name: 'notfound',
      component: NotFoundPage,
      beforeEnter,
    },
  ],
});

function beforeEnter(to, from, next) {
  if (store.getters['isLoggedIn'] || getUserFromCookie()) {
    next();
  } else {
    alert('sign in please');
    next('/login');
  }
}

// import Vue from 'vue';
// import VueRouter from 'vue-router';
// import store from '@/store/index';
// // import LoginPage from '@/views/LoginPage';
// // import SignupPage from '@/views/SignupPage';
//
// Vue.use(VueRouter);
//
// const router = new VueRouter({
//   mode: 'history', // URL의 #이 제거됨.
//   routes: [
//     {
//       path: '/',
//       redirect: '/login', // redirect: 초기 진입 페이지 설정
//     },
//     {
//       path: '/login',
//       component: () => import('@/views/LoginPage'), //코드 스플리팅
//     },
//     {
//       path: '/signup',
//       component: () => import('@/views/SignupPage'), //코드 스플리팅
//     },
//     {
//       path: '/main',
//       component: () => import('@/views/MainPage'), //코드 스플리팅
//       meta: { auth: true },
//     },
//     {
//       path: '/add',
//       component: () => import('@/views/PostAddPage'),
//       meta: { auth: true },
//     },
//     {
//       path: '/post/:id',
//       component: () => import('@/views/PostEditPage'),
//       meta: { auth: true },
//     },
//     {
//       path: '*', // 없는 페이지를 접근할 때의 라우터 처리
//       component: () => import('@/views/NotFoundPage'),
//     },
//   ],
// });
//
// router.beforeEach((to, from, next) => {
//   if (to.meta.auth && !store.getters.isLogin) {
//     console.log('인증이 필요합니다');
//     next('/login');
//     return;
//   }
//   next();
// });
//
// export default router;

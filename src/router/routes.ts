import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/BlankLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/landing/LandingPage.vue'), meta: { transition: 'slide-up', notSecured: true } },
      { path: '/login', component: () => import('pages/landing/LoginPage.vue'), meta: { transition: 'slide-right', notSecured: true } },
      { path: '/signup', component: () => import('pages/landing/SignupPage.vue'), meta: { transition: 'slide-left', notSecured: true } },
      { path: '/accountDeleted', component: () => import('pages/other/AccountDeleted.vue'), meta: { transition: 'slide-up', notSecured: true } },
      { path: '/loggedOut', component: () => import('pages/other/LoggedOut.vue'), meta: { transition: 'slide-up', notSecured: true } },
      { path: '/:catchAll(.*)*', component: () => import('pages/other/ErrorNotFound.vue'), meta: { notSecured: true }, }
    ],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/calendar', component: () => import('pages/calendar/MainCalendarPage.vue'), meta: { positionOnNavBar: 1 } },
      { path: '/groups', component: () => import('pages/groups/MainGroupsPage.vue'), meta: { positionOnNavBar: 2 } },
      { path: '/home', component: () => import('pages/main/HomePage.vue'), meta: { positionOnNavBar: 3 } },
      { path: '/settings', component: () => import('pages/settings/MainSettingsPage.vue'), meta: { positionOnNavBar: 5 } },
    ],
  },
];

export default routes;

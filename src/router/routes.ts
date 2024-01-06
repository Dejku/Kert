import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/home' },
  {
    path: '/',
    component: () => import('layouts/BlankLayout.vue'),
    children: [
      { path: '/login', component: () => import('pages/main/LoginPage.vue'), meta: { transition: 'slide-right' } },
      { path: '/signup', component: () => import('pages/main/SignupPage.vue'), meta: { transition: 'slide-left' } },
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
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/other/ErrorNotFound.vue'),
  },
];

export default routes;

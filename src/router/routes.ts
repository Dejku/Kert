import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/BlankLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/other/LoadingPage.vue') },
      { path: '/landing', component: () => import('pages/landing/LandingPage.vue'), meta: { transition: 'slide-up' } },
      { path: '/login', component: () => import('pages/landing/LoginPage.vue'), meta: { transition: 'slide-right' } },
      { path: '/signup', component: () => import('pages/landing/SignupPage.vue'), meta: { transition: 'slide-left' } },
      { path: '/accountDeleted', component: () => import('pages/other/AccountDeleted.vue') },
      { path: '/loggedOut', component: () => import('pages/other/LoggedOut.vue') },
      { name: 'ErrorNotFound', path: '/:catchAll(.*)*', component: () => import('pages/other/ErrorNotFound.vue') }
    ],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/calendar', component: () => import('pages/calendar/MainCalendarPage.vue'), meta: { positionOnNavBar: 1, requireAuth: true } },
      { path: '/groups', component: () => import('pages/groups/MainGroupsPage.vue'), meta: { positionOnNavBar: 2, requireAuth: true } },
      { path: '/home', component: () => import('pages/main/HomePage.vue'), meta: { positionOnNavBar: 3, requireAuth: true } },
      { path: '/tasks', component: () => import('pages/tasks/MainTasksPage.vue'), meta: { positionOnNavBar: 4, requireAuth: true } },
      { path: '/settings', component: () => import('pages/settings/MainSettingsPage.vue'), meta: { positionOnNavBar: 5, requireAuth: true } },
    ],
  },
];

export default routes;

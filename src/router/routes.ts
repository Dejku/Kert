import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/home' },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/calendar', component: () => import('pages/calendar/MainCalendarPage.vue'), meta: { positionOnNavBar: 1 } },
      { path: '/groups', component: () => import('pages/groups/MainGroupsPage.vue'), meta: { positionOnNavBar: 2 } },
      { path: '/home', component: () => import('pages/main/HomePage.vue'), meta: { positionOnNavBar: 3 } },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/other/ErrorNotFound.vue'),
  },
];

export default routes;

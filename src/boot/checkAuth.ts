import { boot } from 'quasar/wrappers'
import { useAccountStore } from 'stores/accountStore';

export default boot(({ router }) => {
  router.beforeEach((to, from, next) => {
    const accountStore = useAccountStore();

    if (!to.matched.some(record => record.meta.requireAuth) && accountStore.isLogged) return next('/home');

    if (!to.matched.some(record => record.meta.requireAuth)) return next();

    if (to.matched.some(record => record.meta.requireAuth) && accountStore.isLogged) return next();

    next('/')
  })
})
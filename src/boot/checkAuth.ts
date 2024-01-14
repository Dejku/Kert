import { boot } from 'quasar/wrappers'
import { useAccountStore } from 'stores/accountStore';

export default boot(({ router }) => {
  router.beforeEach((to, from, next) => {
    const accountStore = useAccountStore();

    if (accountStore.isLogged || to.matched.some(record => record.meta.notSecured)) return next();

    next('/');
  })
})
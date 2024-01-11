import { boot } from 'quasar/wrappers'

export default boot(({ router }) => {
  router.beforeEach((to, from) => {
    // from nav to nav
    if (from.meta.positionOnNavBar && to.meta.positionOnNavBar) {
      const to_PositionOnNavBar = to.meta.positionOnNavBar as number;
      const from_PositionOnNavBar = from.meta.positionOnNavBar as number;

      to.meta.transition = to_PositionOnNavBar < from_PositionOnNavBar ? 'slide-right' : 'slide-left';
      return true;
    }

    // from another page to nav
    if (from.meta.positionOnNavBar == undefined && to.meta.transition == undefined) {
      to.meta.transition = from.meta.transition == 'slide-right' ? 'slide-left' : 'slide-right'
      return true;
    };
  })
})
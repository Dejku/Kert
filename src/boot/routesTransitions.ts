import { boot } from 'quasar/wrappers'

export default boot(({ router }) => {
  router.beforeEach((to, from) => {
    // from nav to nav
    if (from.meta.positionOnNavBar && to.meta.positionOnNavBar) {
      const to_PositionOnNavBar = to.meta.positionOnNavBar as number;
      const from_PositionOnNavBar = from.meta.positionOnNavBar as number;

      to.meta.transition = to_PositionOnNavBar < from_PositionOnNavBar ? 'page-slide-right' : 'page-slide-left';

      return true;
    }

    // from special page to login or signup page
    if ((from.path == '/' || from.path == '/loggedOut' || from.path == '/accountDeleted') && (to.path == '/login' || to.path == '/signup')) {
      to.meta.transition = 'page-slide-down';

      return true;
    }

    // from another page to nav
    if (from.meta.positionOnNavBar == undefined && to.meta.transition == undefined) {
      to.meta.transition = from.meta.transition == 'page-slide-right' ? 'page-slide-left' : 'page-slide-right';

      return true;
    };

    // from support pages
    if (from.name == 'Support' && to.name == 'Support Center') {
      to.meta.transition = 'page-slide-right';

      return true;
    };
  })
})
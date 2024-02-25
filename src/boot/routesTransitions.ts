import { boot } from 'quasar/wrappers'

export default boot(({ router }) => {
  router.beforeEach((to, from) => {
    // from nav to nav
    if (from.meta.positionOnNavBar && to.meta.positionOnNavBar) {
      const to_PositionOnNavBar = to.meta.positionOnNavBar as number;
      const from_PositionOnNavBar = from.meta.positionOnNavBar as number;

      to.meta.transition = to_PositionOnNavBar < from_PositionOnNavBar ? 'slide-right' : 'slide-left';
    }

    // from special page to login or signup page
    if ((from.path == '/' || from.path == '/loggedOut' || from.path == '/accountDeleted') && (to.path == '/login' || to.path == '/signup')) {
      to.meta.transition = 'slide-down'
    }

    // from another page to nav
    if (from.meta.positionOnNavBar == undefined && to.meta.transition == undefined) {
      to.meta.transition = from.meta.transition == 'slide-right' ? 'slide-left' : 'slide-right'
    };

    // from support pages
    if (from.name == 'Support' && to.name == 'Support Center') {
      to.meta.transition = 'slide-right'
    };

    return true;
  })
})
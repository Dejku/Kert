import { boot } from 'quasar/wrappers'

export default boot(({ router }) => {
  let blockPageSwitch = false;
  let timeout: ReturnType<typeof setTimeout>;

  router.beforeEach(() => {
    if (blockPageSwitch) return false;
    clearTimeout(timeout);

    blockPageSwitch = true;
  })

  router.afterEach(() => {
    timeout = setTimeout(() => blockPageSwitch = false, 500);
  })
})
import { boot } from 'quasar/wrappers'
import BaseButton from 'src/components/~Global/BaseButton.vue';

export default boot(({ app }) => {
  app.component('BaseButton', BaseButton)
})
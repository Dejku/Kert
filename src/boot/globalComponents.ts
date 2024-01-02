import { boot } from 'quasar/wrappers'
import BaseButton from 'src/components/~Global/BaseButton.vue';
import BaseInput from 'src/components/~Global/BaseInput.vue';

export default boot(({ app }) => {
  app.component('BaseButton', BaseButton)
  app.component('BaseInput', BaseInput)
})
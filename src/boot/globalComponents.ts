import { boot } from 'quasar/wrappers'
import BaseButton from 'src/components/~Global/BaseButton.vue';
import BaseInput from 'src/components/~Global/BaseInput.vue';
import BaseOTP from 'src/components/~Global/BaseOTP.vue';

export default boot(({ app }) => {
  app.component('BaseButton', BaseButton)
  app.component('BaseInput', BaseInput)
  app.component('BaseOTP', BaseOTP)
})
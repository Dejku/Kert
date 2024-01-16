import { boot } from 'quasar/wrappers'
import BaseButton from 'components/~Global/BaseButton.vue';
import BaseInput from 'components/~Global/BaseInput.vue';
import BaseOTP from 'components/~Global/BaseOTP.vue';
import BaseTitle from 'components/~Global/BaseTitle.vue';

export default boot(({ app }) => {
  app.component('BaseButton', BaseButton)
  app.component('BaseInput', BaseInput)
  app.component('BaseOtp', BaseOTP)
  app.component('BaseTitle', BaseTitle)
})
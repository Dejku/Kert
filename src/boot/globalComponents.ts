import { boot } from 'quasar/wrappers'
import BaseBadge from 'components/~Global/BaseBadge.vue';
import BaseButton from 'components/~Global/BaseButton.vue';
import BaseImage from 'components/~Global/BaseImage.vue';
import BaseInput from 'components/~Global/BaseInput.vue';
import BaseOTP from 'components/~Global/BaseOTP.vue';
import BaseTitle from 'components/~Global/BaseTitle.vue';

export default boot(({ app }) => {
  app.component('BaseBadge', BaseBadge)
  app.component('BaseButton', BaseButton)
  app.component('BaseImage', BaseImage)
  app.component('BaseInput', BaseInput)
  app.component('BaseOtp', BaseOTP)
  app.component('BaseTitle', BaseTitle)
})
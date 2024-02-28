import BaseBadge from './BaseBadge.vue'
import BaseButton from './BaseButton.vue'
import BaseImage from './BaseImage.vue'
import BaseInput from './BaseInput.vue'
import BaseOTP from './BaseOTP.vue'
import BaseTitle from './BaseTitle.vue'

declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        BaseBadge: typeof BaseBadge,
        BaseButton: typeof BaseButton,
        BaseImage: typeof BaseImage,
        BaseInput: typeof BaseInput,
        BaseOtp: typeof BaseOTP,
        BaseTitle: typeof BaseTitle,
    }
}
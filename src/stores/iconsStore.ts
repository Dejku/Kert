import { defineStore } from 'pinia';

export const useIconsStore = defineStore('icons', {
  state: () => ({
    icons: {
      alertCircle: 'eva-alert-circle-outline',
      arrowBack: 'eva-arrow-back-outline',
      arrowDownRight: 'eva-corner-down-right-outline',
      arrowLeft: 'eva-arrow-ios-back-outline',
      arrowRight: 'eva-arrow-ios-forward-outline',
      arrowUpLeft: 'eva-corner-up-left-outline',
      arrowUpRight: 'eva-corner-up-right-outline',
      bell: 'eva-bell-outline',
      calendar: 'eva-calendar-outline',
      circle: 'eva-radio-button-off-outline',
      colorPalette: 'eva-color-palette-outline',
      clock: 'eva-clock-outline',
      close: 'eva-close-outline',
      email: 'eva-email-outline',
      edit: 'eva-edit-outline',
      eye: 'eva-eye-outline',
      eyeOff: 'eva-eye-off-outline',
      filter: 'eva-funnel-outline',
      home: 'eva-home-outline',
      info: 'eva-info-outline',
      list: 'eva-list',
      lock: 'eva-lock-outline',
      login: 'eva-log-in-outline',
      logout: 'eva-log-out-outline',
      mail: 'eva-email-outline',
      person: 'eva-person-outline',
      people: 'eva-people-outline',
      plus: 'eva-plus-outline',
      plusCircle: 'eva-plus-circle-outline',
      questionMark: 'eva-question-mark-outline',
      questionMarkCircle: 'eva-question-mark-circle-outline',
      settings: 'eva-settings-2-outline',
      slash: 'eva-slash-outline',
      success: 'eva-checkmark-outline',
      successCircle: 'eva-checkmark-circle-2-outline',
      text: 'eva-text-outline',
      volumeDown: 'eva-volume-down-outline',
      volumeMute: 'eva-volume-mute-outline',
      volumeUp: 'eva-volume-up-outline',
      warning: 'eva-alert-triangle-outline',
      wifiOff: 'eva-wifi-off-outline',
    }
  }),

  actions: {
    getAlertIcon(state: string) {
      if (state == 'success') return this.icons.success;
      else if (state == 'info') return this.icons.info;
      else if (state == 'warning') return this.icons.warning;
      else if (state == 'error') return this.icons.slash;
      else if (state == 'noWifi') return this.icons.wifiOff;
    }
  }
});

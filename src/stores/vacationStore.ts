import { defineStore } from 'pinia';

import { fireEvent } from 'utils';
import { Normal, ErrorAlert } from 'models';

import { useModalStore } from 'stores/modalStore';
import { useAlertStore } from 'stores/alertStore';
import { useAccountStore } from 'stores/accountStore';
import { doc, getFirestore, updateDoc, getDoc } from 'firebase/firestore';

const today = new Date();

export const useVacationStore = defineStore('vacations', {
  state: () => ({
    currentYear: 0,
    overdueVacationDays: 0,
    numberOfVacationDaysPerYear: 20,
    availableLimitsForUser: {
      'Urlop wypoczynkowy': 20,
      'Na żądanie': 4,
      'Siła wyższa': 16,
    },
    claimedVacationDays: [] as ClaimedVacationDays[],
    hasUnsavedChanges: false,
  }),

  actions: {
    createAlert(data: Alert) {
      const { createAlert } = useAlertStore();

      createAlert(data);
    },

    // VACATION DAYS
    async fetchCalendarData(userID: User['id']) {
      const db = getFirestore();
      const docRef = doc(db, 'vacationStore', userID);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) return;

      const data = docSnap.data();
      this.numberOfVacationDaysPerYear = data.numberOfVacationDaysPerYear;
      this.claimedVacationDays = data.claimedVacationDays;

      if (data.currentYear < today.getFullYear()) {
        this.currentYear = today.getFullYear();

        this.updateDatabase({
          currentYear: today.getFullYear(),
          overdueVacationDays: this.availableLimitsForUser['Urlop wypoczynkowy'] - this.countClaimedNormalVacationDaysInYear(today.getFullYear() - 1)
        });
      } else {
        this.currentYear = data.currentYear;
        this.overdueVacationDays = data.overdueVacationDays;
      }

      this.availableLimitsForUser['Urlop wypoczynkowy'] = data.numberOfVacationDaysPerYear;
    },

    showUnsavedChanges() {
      if (this.hasUnsavedChanges) return;

      this.hasUnsavedChanges = true;
    },

    async saveChanges() {
      await this.updateDatabase({ 'claimedVacationDays': this.claimedVacationDays })
        .catch(() => { return this.createAlert(ErrorAlert) });

      this.hasUnsavedChanges = false;
      this.createAlert({ message: 'Zmiany zostały pomyślnie zapisane', status: 'success', duration: 4, isImportant: true })
    },

    async discardChanges() {
      const accountStore = useAccountStore();
      const db = getFirestore();
      const docRef = doc(db, 'vacationStore', accountStore.getID);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) return this.createAlert(ErrorAlert)

      this.claimedVacationDays = docSnap.data().claimedVacationDays;

      this.hasUnsavedChanges = false;
      this.createAlert({ message: 'Zmiany zostały wycofane', status: 'info', duration: 4, isImportant: true })
    },

    addVacationDay(day: ClaimedVacationDays) {
      if (this.isVacationLimitReached(day.type.name, day.date, day.type.time.hours))
        return this.createAlert({
          message: 'Wykorzystano cały urlop',
          status: 'warning',
          duration: 5
        });

      this.claimedVacationDays.push(day);

      this.showUnsavedChanges();
    },

    async selectVacationDay(date: AppDate) {
      if (!this.isExist(date))
        return this.addVacationDay({
          date,
          type: Normal
        });

      if (this.checkType(date, true)) {
        const response = await this.showVacation(date);

        if (response.status == 'success') this.removeVacationDay(date);
        return;
      };

      this.removeVacationDay(date);
    },

    async holdSelectVacationDay(date: AppDate) {
      const modalStore = useModalStore();

      if (this.isExist(date)) {
        const response = await this.showVacation(date);

        if (response.status == 'success') this.removeVacationDay(date)
      }
      else {
        const response = await modalStore.showModal({
          component: {
            type: 'addVacation',
            options: {
              date,
            },
          },
          buttonsOptions: {
            secondaryButton: {
              label: 'Dodaj urlop',
            },
          },
        })

        if (response.status == 'success')
          this.addVacationDay({
            date,
            type: {
              name: modalStore.component.vacationDays.name,
              isSpecial: modalStore.component.vacationDays.isSpecial,
              time: {
                type: modalStore.component.vacationDays.time.type,
                hours: modalStore.component.vacationDays.time.hours,
              }
            }
          })
      }
    },

    removeVacationDay(date: AppDate) {
      this.claimedVacationDays = this.claimedVacationDays.filter(claimedDate => {
        return claimedDate.date.day !== date.day || claimedDate.date.month !== date.month || claimedDate.date.year !== date.year
      });

      this.showUnsavedChanges();
    },

    // UPDATE FUNCTIONS

    async updateDatabase(data: object, waitForEvent?: string) {
      const accountStore = useAccountStore();
      const db = getFirestore();
      const docRef = doc(db, 'vacationStore', accountStore.getID);

      let status = 'unknown';
      await updateDoc(docRef, data)
        .then(() => status = 'success')
        .catch(() => status = 'error')

      if (waitForEvent) fireEvent(waitForEvent, { status })
    },

    // COUNT FUNCTIONS
    countAvailableNormalVacationDaysInYear(year: number): number {
      let overdueVacationDays = 0;
      if (year == today.getFullYear()) overdueVacationDays = this.overdueVacationDays;

      return this.availableLimitsForUser['Urlop wypoczynkowy'] - this.countClaimedNormalVacationDaysInYear(year) + overdueVacationDays;
    },

    countClaimedNormalVacationDaysInYear(year: number): number {
      return this.claimedVacationDays.filter(element => element.date.year == year && (element.type.name == 'Urlop wypoczynkowy' || element.type.name == 'Na żądanie')).length
    },

    countClaimedNormalVacationDaysInMonth(year: number, month: number): number {
      return this.claimedVacationDays.filter(element => element.date.month == month && element.date.year == year && (element.type.name == 'Urlop wypoczynkowy' || element.type.name == 'Na żądanie')).length
    },

    countAvailableVacationByType(type: VacationNames, year: number, month?: number): number {
      let overdueVacationDays = 0;
      if (type == 'Urlop wypoczynkowy') overdueVacationDays = this.overdueVacationDays;

      return this.availableLimitsForUser[type] - this.countClaimedVacationByType(type, year, month) + overdueVacationDays;
    },

    countClaimedVacationByType(type: VacationNames, year: number, month?: number): number {
      let count = 0;
      const days = month ? this.getClaimedDaysInMonth(type, year, month) : this.getClaimedDaysInYear(type, year);

      if (days.every(element => element.type.time.type == 'hours'))
        days.forEach(element => count += element.type.time.hours)
      else
        count = days.length;

      return count;
    },

    getClaimedDaysInYear(type: VacationNames, year: number): ClaimedVacationDays[] {
      return this.claimedVacationDays.filter(element => element.date.year == year && element.type.name == type)
    },

    getClaimedDaysInMonth(type: VacationNames, year: number, month: number): ClaimedVacationDays[] {
      return this.claimedVacationDays.filter(element => element.date.month == month && element.date.year == year && element.type.name == type)
    },

    // OTHERS FUNCTIONS
    isExist(date: AppDate): boolean {
      return this.claimedVacationDays.some(claimedDate => {
        return claimedDate.date.day == date.day && claimedDate.date.month == date.month && claimedDate.date.year == date.year;
      });
    },

    checkType(date: AppDate, isSpecial: boolean): boolean {
      return this.claimedVacationDays.some(claimedDate => {
        return claimedDate.date.day == date.day && claimedDate.date.month == date.month && claimedDate.date.year == date.year && claimedDate.type.isSpecial == isSpecial;
      });
    },

    findVacation(date: AppDate): ClaimedVacationDays {
      return this.claimedVacationDays.filter(claimedDate => claimedDate.date.day == date.day && claimedDate.date.month == date.month && claimedDate.date.year == date.year)[0]
    },

    async showVacation(date: AppDate): Promise<AppResponse> {
      const modalStore = useModalStore();

      modalStore.component.vacationDays = this.findVacation(date).type;

      return await modalStore.showModal({
        component: {
          type: 'showVacation',
          options: {
            date,
          },
        },
        buttonsOptions: {
          secondaryButton: {
            label: 'Usuń urlop',
            color: 'error',
          },
        },
      })
    },

    isVacationLimitReached(type: VacationNames, date: AppDate, hours?: number): boolean {
      const checkNormalVacationDays = () =>
        (type == 'Urlop wypoczynkowy' || type == 'Na żądanie') && this.countClaimedNormalVacationDaysInYear(date.year) >= (this.availableLimitsForUser['Urlop wypoczynkowy'] + this.overdueVacationDays);

      if (checkNormalVacationDays()) return true;

      return this.countAvailableVacationByType(type, date.year) - (hours || 0) < 0;
    },
  }
});
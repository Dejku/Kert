import { defineStore } from 'pinia';
import { Normal, ClaimedVacationDays, Date as DateModel, VacationNames, CustomResponse, Alert, ErrorAlert } from 'components/models';
import { useModalStore } from './modalStore';
import { useAlertsStore } from './alertsStore';
import { useAccountStore } from './accountStore';
import { doc, getFirestore, updateDoc, getDoc } from 'firebase/firestore';

const today = new Date();

export const useVacationStore = defineStore('vacation', {
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
  }),

  actions: {
    createAlert(data: Omit<Alert, 'id'>) {
      const { createAlert } = useAlertsStore();

      createAlert({ message: data.message, state: data.state, duration: data.duration });
    },

    // VACATION DAYS
    async saveCalendarData() {
      const accountStore = useAccountStore();
      const db = getFirestore();
      const docRef = doc(db, 'vacationStore', accountStore.user.id);

      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.error('No such document!');
        this.createAlert(ErrorAlert);
        return
      }
      const data = docSnap.data();

      this.numberOfVacationDaysPerYear = data.numberOfVacationDaysPerYear;
      this.claimedVacationDays = data.claimedVacationDays;

      if (data.currentYear < today.getFullYear()) {
        this.currentYear = today.getFullYear();
        this.overdueVacationDays = this.countClaimedNormalVacationDaysInYear(today.getFullYear() - 1);

        await updateDoc(docRef, { 'currentYear': today.getFullYear(), });
      } else {
        this.currentYear = data.currentYear;
        this.overdueVacationDays = data.overdueVacationDays;
      }

      this.availableLimitsForUser['Urlop wypoczynkowy'] = data.numberOfVacationDaysPerYear;
    },

    async addVacationDay(day: ClaimedVacationDays): Promise<void> {
      const accountStore = useAccountStore();
      const db = getFirestore();
      const docRef = doc(db, 'vacationStore', accountStore.user.id);

      if (this.isVacationLimitReached(day.type.name, day.date))
        return this.createAlert({
          message: 'Wykorzystano wszystkie dni urlopu',
          state: 'warning',
          duration: 5
        });

      this.claimedVacationDays.push(day);
      await updateDoc(docRef, { 'claimedVacationDays': this.claimedVacationDays, });
    },

    async selectVacationDay(date: DateModel): Promise<void> {
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

    async holdSelectVacationDay(date: DateModel): Promise<void> {
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
            extendedButton: {
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

    async removeVacationDay(date: DateModel): Promise<void> {
      const accountStore = useAccountStore();
      const db = getFirestore();
      const docRef = doc(db, 'vacationStore', accountStore.user.id);

      this.claimedVacationDays = this.claimedVacationDays.filter(claimedDate => {
        return claimedDate.date.day !== date.day || claimedDate.date.month !== date.month || claimedDate.date.year !== date.year
      });

      await updateDoc(docRef, { 'claimedVacationDays': this.claimedVacationDays, });
    },

    // COUNT FUNCTIONS
    countAvailableNormalVacationDaysInYear(year: number): number {
      return this.availableLimitsForUser['Urlop wypoczynkowy'] - this.countClaimedNormalVacationDaysInYear(year);
    },

    countClaimedNormalVacationDaysInYear(year: number): number {
      return this.claimedVacationDays.filter(element => element.date.year == year && (element.type.name == 'Urlop wypoczynkowy' || element.type.name == 'Na żądanie')).length
    },

    countClaimedNormalVacationDaysInMonth(month: number, year: number): number {
      return this.claimedVacationDays.filter(element => element.date.month == month && element.date.year == year && (element.type.name == 'Urlop wypoczynkowy' || element.type.name == 'Na żądanie')).length
    },

    countAvailableVacationByType(type: VacationNames, year: number, month?: number): number {
      return this.availableLimitsForUser[type] - this.countClaimedVacationByType(type, year, month);
    },

    countClaimedVacationByType(type: VacationNames, year: number, month?: number): number {
      let count = 0;
      const days = month ? this.getClaimedDaysInMonth(type, month, year) : this.getClaimedDaysInYear(type, year);

      if (days.every(element => element.type.time.type == 'hours'))
        days.forEach(element => count += element.type.time.hours)
      else
        count = days.length;

      return count;
    },

    getClaimedDaysInYear(type: VacationNames, year: number): ClaimedVacationDays[] {
      return this.claimedVacationDays.filter(element => element.date.year == year && element.type.name == type)
    },

    getClaimedDaysInMonth(type: VacationNames, month: number, year: number): ClaimedVacationDays[] {
      return this.claimedVacationDays.filter(element => element.date.month == month && element.date.year == year && element.type.name == type)
    },

    // OTHERS FUNCTIONS
    isExist(date: DateModel): boolean {
      return this.claimedVacationDays.some(claimedDate => {
        return claimedDate.date.day == date.day && claimedDate.date.month == date.month && claimedDate.date.year == date.year;
      });
    },

    checkType(date: DateModel, isSpecial: boolean): boolean {
      return this.claimedVacationDays.some(claimedDate => {
        return claimedDate.date.day == date.day && claimedDate.date.month == date.month && claimedDate.date.year == date.year && claimedDate.type.isSpecial == isSpecial;
      });
    },

    findVacation(date: DateModel): ClaimedVacationDays {
      return this.claimedVacationDays.filter(claimedDate => claimedDate.date.day == date.day && claimedDate.date.month == date.month && claimedDate.date.year == date.year)[0]
    },

    async showVacation(date: DateModel): Promise<CustomResponse> {
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
          extendedButton: {
            label: 'Usuń urlop',
            color: 'error',
          },
        },
      })
    },

    isVacationLimitReached(type: VacationNames, date: DateModel): boolean {
      if (type == 'Na żądanie' && this.countAvailableVacationByType('Urlop wypoczynkowy', date.year) <= 0) return true;

      return this.countAvailableVacationByType(type, date.year) <= 0
    },
  }
});

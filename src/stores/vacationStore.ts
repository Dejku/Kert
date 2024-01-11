import { defineStore } from 'pinia';
import { Normal, ClaimedVacationDays, Date, VacationNames, CustomResponse, Alert } from 'components/models';
import { useModalStore } from './modalStore';
import { useAlertsStore } from './alertsStore';

export const useVacationStore = defineStore('vacation', {
  state: () => ({
    currentYear: 2023,
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

    addVacationDay(day: ClaimedVacationDays): void {
      if (this.isVacationLimitReached(day.type.name, day.date))
        return this.createAlert({
          message: 'Wykorzystano wszystkie dni urlopu',
          state: 'warning',
          duration: 5
        });

      this.claimedVacationDays.push(day);
    },

    async selectVacationDay(date: Date): Promise<void> {
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

    async holdSelectVacationDay(date: Date): Promise<void> {
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

    removeVacationDay(date: Date): void {
      this.claimedVacationDays = this.claimedVacationDays.filter(claimedDate => {
        return claimedDate.date.day !== date.day || claimedDate.date.month !== date.month || claimedDate.date.year !== date.year
      });
    },

    // count functions

    countAvailableNormalVacationDaysInYear(year: number): number {
      return this.availableLimitsForUser['Urlop wypoczynkowy'] - this.claimedVacationDays.filter(element => element.date.year == year && (element.type.name == 'Urlop wypoczynkowy' || element.type.name == 'Na żądanie')).length
    },

    countVacationDaysInMonth(month: number, year: number): number {
      return this.claimedVacationDays.filter(element => element.date.month == month && element.date.year == year && (element.type.name == 'Urlop wypoczynkowy' || element.type.name == 'Na żądanie')).length
    },

    countAvailableVacationByType(type: VacationNames, year: number, month?: number): number {
      return this.availableLimitsForUser[type] - this.countVacationByType(type, year, month);
    },

    countVacationByType(type: VacationNames, year: number, month?: number): number {
      let count = 0;
      const days = month ? this.getDaysInMonth(type, month, year) : this.getDaysInYear(type, year);

      if (days.every(element => element.type.time.type == 'hours'))
        days.forEach(element => count += element.type.time.hours)
      else
        count = days.length;

      return count;
    },

    getDaysInYear(type: VacationNames, year: number): ClaimedVacationDays[] {
      return this.claimedVacationDays.filter(element => element.date.year == year && element.type.name == type)
    },

    getDaysInMonth(type: VacationNames, month: number, year: number): ClaimedVacationDays[] {
      return this.claimedVacationDays.filter(element => element.date.month == month && element.date.year == year && element.type.name == type)
    },

    // others function

    isExist(date: Date): boolean {
      return this.claimedVacationDays.some(claimedDate => {
        return claimedDate.date.day == date.day && claimedDate.date.month == date.month && claimedDate.date.year == date.year;
      });
    },

    checkType(date: Date, isSpecial: boolean): boolean {
      return this.claimedVacationDays.some(claimedDate => {
        return claimedDate.date.day == date.day && claimedDate.date.month == date.month && claimedDate.date.year == date.year && claimedDate.type.isSpecial == isSpecial;
      });
    },

    findVacation(date: Date): ClaimedVacationDays {
      return this.claimedVacationDays.filter(claimedDate => claimedDate.date.day == date.day && claimedDate.date.month == date.month && claimedDate.date.year == date.year)[0]
    },

    async showVacation(date: Date): Promise<CustomResponse> {
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

    isVacationLimitReached(type: VacationNames, date: Date): boolean {
      if (type == 'Na żądanie' && this.countAvailableVacationByType('Urlop wypoczynkowy', date.year) <= 0) return true;

      return this.countAvailableVacationByType(type, date.year) <= 0
    },
  }
});

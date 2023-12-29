import { defineStore } from 'pinia';
import { Normal, ClaimedVacationDays, Date, VacationNames, CustomResponse } from 'components/models';
import { useModalStore } from './modalStore';

export const useVacationStore = defineStore('vacation', {
  state: () => ({
    currentYear: 2023,
    availableLimitsForUser: {
      vacationDays: 20,
      onDemandDays: 4,
      forceHours: 16,
    },
    claimedVacationDays: [] as ClaimedVacationDays[],
  }),

  actions: {
    // adding days

    addVacationDay(day: ClaimedVacationDays) {
      this.claimedVacationDays.push(day);
    },

    async selectVacationDay(date: Date) {
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

    async holdSelectVacationDay(date: Date) {
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

    // removing days

    removeVacationDay(date: Date) {
      this.claimedVacationDays = this.claimedVacationDays.filter(claimedDate => {
        return claimedDate.date.day !== date.day || claimedDate.date.month !== date.month || claimedDate.date.year !== date.year
      });
    },

    // count functions

    countAllAvailableVacationDays(year: number): number {
      return this.availableLimitsForUser.vacationDays - this.countVacationDaysInYear(year);
    },

    countAvailableNormalVacationDays(year: number): number {
      return this.availableLimitsForUser.vacationDays - this.countVacationDaysByTypeInYear('Urlop wypoczynkowy', year);
    },

    countAvailableOnDemandDays(year: number): number {
      return this.availableLimitsForUser.onDemandDays - this.countVacationDaysByTypeInYear('Na żądanie', year);
    },

    countAvailableForceDays(year: number): number {
      return this.availableLimitsForUser.forceHours - this.countVacationHoursByTypeInYear('Siła wyższa', year);
    },

    countVacationDaysByTypeInYear(typeName: VacationNames, year: number): number {
      return this.claimedVacationDays.filter(element => this.checkVacationType(element, typeName, year)).length;
    },

    countVacationHoursByTypeInYear(typeName: VacationNames, year: number): number {
      let hours = 0;
      const elements = this.claimedVacationDays.filter(element => this.checkVacationType(element, typeName, year));
      elements.forEach(element => hours += element.type.time.hours);

      return hours;
    },

    countVacationDaysInMonth(month: number, year: number): number {
      return this.claimedVacationDays.filter(element => this.checkDay(element, month + 1, year)).length;
    },

    countVacationDaysInYear(year: number): number {
      return this.claimedVacationDays.filter(element => this.checkYear(element, year)).length;
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

    checkVacationType(element: ClaimedVacationDays, typeName: VacationNames, year: number): boolean {
      return element.type.name == typeName && element.date.year == year
    },

    checkDay(element: ClaimedVacationDays, month: number, year: number): boolean {
      return element.date.month == month && element.date.year == year
    },

    checkYear(element: ClaimedVacationDays, year: number): boolean {
      return element.date.year == year
    },
  }
});

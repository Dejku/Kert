import { defineStore } from 'pinia';

interface Date {
  day: number,
  month: number,
  year: number,
}

export const useVacationStore = defineStore('vacation', {
  state: () => ({
    currentYear: undefined,
    numberOfVacationDaysPerYear: 20,
    vacationDaysFromPrevYear: 0,
    availableVacationDaysForUser: 20,
    claimedVacationDays: [] as Date[],
  }),

  actions: {
    isExist(dateToCheck: Date) {
      return this.claimedVacationDays.some(claimedDate => {
        return claimedDate.day == dateToCheck.day && claimedDate.month == dateToCheck.month && claimedDate.year == dateToCheck.year;
      });
    },

    async selectVacationDay(date: Date) {
      if (this.isExist(date)) this.RemoveVacationDay(date)
      else {
        this.claimedVacationDays.push(date);
      }
    },

    RemoveVacationDay(dateToRemove: Date) {
      this.claimedVacationDays = this.claimedVacationDays.filter(claimedDate => {
        return claimedDate.day !== dateToRemove.day || claimedDate.month !== dateToRemove.month || claimedDate.year !== dateToRemove.year
      });
    },
  }
});

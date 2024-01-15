type ClaimedVacationDays = {
    date: AppDate,
    type: VacationTypes
}

type VacationNames = 'Urlop wypoczynkowy' | 'Na żądanie' | 'Siła wyższa';

type VacationTypes = {
    name: VacationNames,
    isSpecial: boolean,
    time: {
        type: 'day' | 'hours'
        hours: number
    }
};
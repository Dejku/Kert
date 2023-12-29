import { Date } from '.';

export interface ClaimedVacationDays {
    date: Date,
    type: VacationTypes
}

export type VacationNames = 'Urlop wypoczynkowy' | 'Na żądanie' | 'Siła wyższa';

export interface VacationTypes {
    name: VacationNames,
    isSpecial: boolean,
    time: {
        type: 'day' | 'hours'
        hours: number
    }
};

export const Normal: VacationTypes = {
    name: 'Urlop wypoczynkowy',
    isSpecial: false,
    time: {
        type: 'day',
        hours: 0
    }
}

export const OnDemand: VacationTypes = {
    name: 'Na żądanie',
    isSpecial: true,
    time: {
        type: 'day',
        hours: 0
    }
}

export const Force: VacationTypes = {
    name: 'Siła wyższa',
    isSpecial: true,
    time: {
        type: 'hours',
        hours: 1
    }
}
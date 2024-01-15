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
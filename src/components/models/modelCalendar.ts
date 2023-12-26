export interface Dates {
    day: number;
    month: number;
    year: number;
    prev?: boolean;
    active?: boolean;
    today?: boolean;
    next?: boolean;
}

export interface Month {
    index: number;
    name: string;
    claimedVacationDaysInMonth: 0;
    dates: Dates[];
    year: number;
}
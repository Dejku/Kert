type CalendarDates = {
    day: number;
    month: number;
    year: number;
    prev?: boolean;
    active?: boolean;
    today?: boolean;
    next?: boolean;
}

type CalendarMonth = {
    index: number;
    name: string;
    claimedVacationDaysInMonth: 0;
    dates: CalendarDates[];
    year: number;
}
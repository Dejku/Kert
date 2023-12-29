import { AppColors } from '.'

export interface ModalStructure {
    title: string | undefined,
    component: Component,
    buttons: ButtonsOptions
}

export interface ModalOption {
    title?: string,
    component: Component,
    buttonsOptions?: ButtonsOptions
}

interface Component {
    type: 'monthSummary' | 'addVacation' | 'showVacation' | undefined,
    options?: {
        date?: {
            day: number,
            month: number,
            year: number
        }
    },
    details?: ComponentAddVacation
}

interface ButtonsOptions {
    baseButton?: {
        label: string,
        color?: AppColors | 'onBackground'
        transparent?: boolean
    },
    extendedButton?: {
        label: string,
        color?: AppColors | 'onBackground'
        transparent?: boolean
    }
}

interface ComponentAddVacation {
    date: {
        day: number,
        month: number,
        year: number
    } | undefined,
    type: string,
    time: {
        type: string,
        hours: number,
    },
}
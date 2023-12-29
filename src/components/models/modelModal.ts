import { AppColors, Date } from '.'

export interface ModalStructure {
    title: string,
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
    options: {
        date?: Date,
    }
}

interface ButtonsOptions {
    baseButton?: ButtonOptions,
    extendedButton?: ButtonOptions
}

interface ButtonOptions {
    label: string | undefined,
    color?: AppColors | 'onBackground',
    transparent?: boolean
}
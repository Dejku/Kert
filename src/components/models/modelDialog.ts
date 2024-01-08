import { AppColors } from '.'

export interface DialogStructure {
    title: string,
    desc?: string,
    buttons: ButtonsOptions
}

export interface DialogOption {
    title: string,
    desc?: string,
    buttonsOptions?: ButtonsOptions
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
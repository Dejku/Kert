type ButtonsOptions = {
    baseButton?: ButtonOptions,
    extendedButton?: ButtonOptions
}

type ButtonOptions = {
    label: string | undefined,
    color?: AppColors,
    transparent?: boolean
}
type ButtonsOptions = {
    baseButton?: ButtonOptions,
    secondaryButton?: ButtonOptions
    isDisabled?: boolean,
}

type ButtonOptions = {
    label: string | undefined,
    color?: AppColors,
    transparent?: boolean
}
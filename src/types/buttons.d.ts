type ComponentButtons = {
    primaryButton: ButtonOptions,
    secondaryButton?: ButtonOptions
    isDisabled?: boolean,
}

type ButtonOptions = {
    label: string,
    color?: AppColors,
    transparent?: boolean
}
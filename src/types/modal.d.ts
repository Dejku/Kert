type ModalStructure = {
    title: string,
    component: Component,
    buttons: ButtonsOptions
}

type ModalOption = {
    title?: string,
    component: Component,
    buttonsOptions?: ButtonsOptions
}

type Component = {
    type: string | undefined,
    options?: {
        date?: AppDate,
    }
}
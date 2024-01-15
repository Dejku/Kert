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
    type: 'monthSummary' | 'addVacation' | 'showVacation' | undefined,
    options: {
        date?: AppDate,
    }
}
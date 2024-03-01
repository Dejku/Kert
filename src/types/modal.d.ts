type Modal = {
    title: string,
    component: Component,
    buttons: ComponentButtons
}

type Component = {
    type: string,
    options?: {
        date: AppDate
    }
}
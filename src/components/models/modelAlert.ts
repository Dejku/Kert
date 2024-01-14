export type Alert = {
    id: string,
    state: 'success' | 'info' | 'warning' | 'error' | 'noWifi',
    message: string,
    duration: number
}

export type HeaderAlert = {
    id: string,
    icon: string
}

export const ErrorAlert: Omit<Alert, 'id'> = {
    state: 'error',
    message: 'Coś poszło nie tak',
    duration: 5
}
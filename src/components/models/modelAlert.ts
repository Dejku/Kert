export type Alert = {
    id: string,
    state: 'success' | 'info' | 'warning' | 'error',
    message: string,
    duration: number
}


export const ErrorAlert: Omit<Alert, 'id'> = {
    state: 'error',
    message: 'Coś poszło nie tak',
    duration: 5
}
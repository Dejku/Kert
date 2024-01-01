export interface Alert {
    id: string,
    state: 'success' | 'info' | 'warning' | 'error',
    message: string,
    duration: number
}
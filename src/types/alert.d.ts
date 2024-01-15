type Alert = {
    id: string,
    state: 'success' | 'info' | 'warning' | 'error' | 'noWifi',
    message: string,
    duration: number
}

type HeaderAlert = {
    id: string,
    icon: string
}
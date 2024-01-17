type Alert = {
    id: string,
    status: 'success' | 'info' | 'warning' | 'error' | 'noWifi',
    message: string,
    duration: number
}

type HeaderAlert = {
    id: string,
    icon: string
}
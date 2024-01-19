type Alert = {
    id?: string,
    status: 'success' | 'info' | 'warning' | 'error' | 'noWifi',
    message: string,
    duration: number
    userCanHide?: boolean
}

type HeaderAlert = {
    id: string,
    icon: string
}
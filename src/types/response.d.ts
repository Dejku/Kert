type AppResponse = {
    code?: number,
    status?: 'success' | 'unknown' | 'error' | 'failed',
    message?: string
}
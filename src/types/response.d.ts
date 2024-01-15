type AppResponse = {
    code?: number,
    status?: 'success' | 'unknown' | 'failed',
    message?: string
}
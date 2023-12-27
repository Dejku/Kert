export interface CustomResponse {
    code?: number,
    status?: 'success' | 'unknown' | 'failed',
    message?: string
}
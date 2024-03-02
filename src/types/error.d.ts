type StorageError = {
    code: string
}

type AppBlockError = 'auth/user-disabled' | 'app/app-disabled' | 'app/new-version';
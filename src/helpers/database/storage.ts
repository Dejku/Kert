import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';

export async function getFile(file: string): Promise<string> {
    const storage = getStorage();

    return await getDownloadURL(ref(storage, file));
}

export async function getAvatar(avatar: string): Promise<string> { // TODO: przerobić typ pliku na jpeg/jpg/png
    try {
        return await getFile(`avatars/${avatar}.png`);
    } catch (error) {
        return 'src/assets/default_avatar.png';
    }
}

export async function setAvatar(id: string, avatar: Blob): Promise<Omit<Alert, 'duration'>> {
    const imageRegExp = new RegExp('\.(jpe?g|png)$');
    const storage = getStorage();

    try {
        if (!imageRegExp.test(avatar.type))
            return {
                status: 'error',
                message: 'Niedozwolony format pliku'
            };

        await uploadBytes(ref(storage, `avatars/${id}.${avatar.type.slice(6)}`), avatar);

        return {
            status: 'success',
            message: 'Zdjęcie profilowe zostało zmienione'
        }
    } catch (err) {
        const error = err as StorageError;

        return {
            status: 'success',
            message: error.code
        }
    }
}
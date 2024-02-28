import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';

export async function getFile(file: string): Promise<string> {
    const storage = getStorage();

    return await getDownloadURL(ref(storage, file));
}

export async function getAvatar(avatarURL: string): Promise<string> {
    try {
        return await getFile(`avatars/${avatarURL}`);
    } catch (error) {
        return await getFile('avatars/default_avatar.png');
    }
}

export async function setAvatar(userID: string, avatar: Blob): Promise<Omit<Alert, 'duration'>> {
    const imageRegExp = new RegExp('\.(jpe?g|png)$');
    const storage = getStorage();

    try {
        if (!imageRegExp.test(avatar.type))
            return {
                status: 'error',
                message: 'Niedozwolony format pliku'
            };

        if (avatar.size > 2 * 1024 * 1024)
            return {
                status: 'error',
                message: 'Rozmiar pliku jest za duży'
            };

        await uploadBytes(ref(storage, `avatars/${userID}`), avatar);

        return {
            status: 'success',
            message: 'Zdjęcie profilowe zostało zmienione'
        }
    } catch (err) {
        const error = err as StorageError;

        return {
            status: 'error',
            message: error.code
        }
    }
}
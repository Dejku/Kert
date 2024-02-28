import { fireEvent } from 'utils';
import { getAvatar } from 'database/storage';
import snapshots from 'database/snapshots';

import { useAppStore } from 'stores/appStore';
import { useAccountStore } from 'stores/accountStore';

import {
    getAuth,
    onAuthStateChanged,
    connectAuthEmulator,
} from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

export default function authStart() {
    const appStore = useAppStore();
    const accountStore = useAccountStore();
    const auth = getAuth();

    if (process.env.DEV) {
        const db = getFirestore();
        const storage = getStorage();

        connectFirestoreEmulator(db, '127.0.0.1', 8080);
        connectAuthEmulator(auth, 'http://127.0.0.1:9099', {
            disableWarnings: true,
        });
        connectStorageEmulator(storage, '127.0.0.1', 9199);
    }

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const photoURL = await getAvatar(user.uid);

            accountStore.saveUser({
                id: user.uid,
                displayName: user.displayName,
                photoURL: photoURL,
            });

            await appStore.fetchData();
            snapshots();
        }

        fireEvent('firebase--auth-ready');
    });
}

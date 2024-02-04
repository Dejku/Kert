import snapshots from 'database/snapshots';
import { useAppStore } from 'stores/appStore';
import { useAccountStore } from 'stores/accountStore';

import {
    getAuth,
    onAuthStateChanged,
    connectAuthEmulator,
} from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

export default function authStart() {
    const appStore = useAppStore();
    const accountStore = useAccountStore();
    const auth = getAuth();

    if (process.env.DEV) {
        const db = getFirestore();
        connectFirestoreEmulator(db, '127.0.0.1', 8080);
        connectAuthEmulator(auth, 'http://127.0.0.1:9099', {
            disableWarnings: true,
        });
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            accountStore.isLogged = true;

            accountStore.saveUser({
                id: user.uid,
                displayName: user.displayName as string,
                photoURL: user.photoURL,
            });

            appStore.fetchData();

            snapshots();
        }
    });
}

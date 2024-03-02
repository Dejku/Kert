import { useAppStore } from 'stores/appStore';
import { useBlockStore } from 'stores/blockStore';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';

export async function handleAppAvailability() {
    if (!process.env.DEV) return;

    const db = getFirestore();
    const appStore = useAppStore();

    onSnapshot(doc(db, 'appStore', 'general'), (doc) => {
        appStore.appBlocked = doc.data()?.appBlocked;

        checkApp(doc.data()?.acceptedVersions);
    });
};

function checkApp(acceptedAppVersions: string[]) {
    const appStore = useAppStore();
    const blockStore = useBlockStore();

    if (blockStore.isAppBlocked) blockStore.$reset();
    if (appStore.appBlocked) return blockStore.showMessage('app/app-disabled');

    const appVersion = appStore.appVersion;
    const sameVersion = acceptedAppVersions.some(version => appVersion == version);

    if (!sameVersion) return blockStore.showMessage('app/new-version');
}
import { useAccountStore } from 'stores/accountStore';
import { useVacationStore } from 'stores/vacationStore';
import { useNewsStore } from 'stores/newsStore';
import { usePreferenceStore } from 'stores/preferenceStore';

import { Unsubscribe, doc, getFirestore, onSnapshot } from 'firebase/firestore';

let vacationStoreUnsubscribe: Unsubscribe, newsStoreUnsubscribe: Unsubscribe, preferenceStoreUnsubscribe: Unsubscribe;
export function snapshotsStart() {
    const db = getFirestore();

    const accountStore = useAccountStore();
    const vacationStore = useVacationStore();
    const newsStore = useNewsStore();
    const preferenceStore = usePreferenceStore()

    vacationStoreUnsubscribe = onSnapshot(doc(db, 'vacationStore', accountStore.getID), (doc) => {
        vacationStore.overdueVacationDays = doc.data()?.overdueVacationDays;
        vacationStore.numberOfVacationDaysPerYear = doc.data()?.numberOfVacationDaysPerYear;
        vacationStore.availableLimitsForUser['Urlop wypoczynkowy'] = doc.data()?.availableLimitsForUser['Urlop wypoczynkowy'];
        vacationStore.claimedVacationDays = doc.data()?.claimedVacationDays;
    });

    newsStoreUnsubscribe = onSnapshot(doc(db, 'newsStore', accountStore.getID), (doc) => newsStore.news = doc.data()?.news);

    preferenceStoreUnsubscribe = onSnapshot(doc(db, 'preferenceStore', accountStore.getID), (doc) => preferenceStore.preference = doc.data()?.preference);
}

export function snapshotsStop() {
    vacationStoreUnsubscribe();
    newsStoreUnsubscribe();
    preferenceStoreUnsubscribe();
}
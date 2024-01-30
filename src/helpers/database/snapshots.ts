import { useAccountStore } from 'stores/accountStore';
import { useVacationStore } from 'stores/vacationStore';
import { useNewsStore } from 'stores/newsStore';
import { usePreferenceStore } from 'stores/preferenceStore';

import { doc, getFirestore, onSnapshot } from 'firebase/firestore';

export default function snapshots() {
    const accountStore = useAccountStore();
    const vacationStore = useVacationStore();
    const newsStore = useNewsStore();
    const preferenceStore = usePreferenceStore()
    const db = getFirestore();

    onSnapshot(doc(db, 'vacationStore', accountStore.user.id), (doc) => {
        vacationStore.overdueVacationDays = doc.data()?.overdueVacationDays;
        vacationStore.numberOfVacationDaysPerYear = doc.data()?.numberOfVacationDaysPerYear;
        vacationStore.availableLimitsForUser['Urlop wypoczynkowy'] = doc.data()?.availableLimitsForUser['Urlop wypoczynkowy'];
        vacationStore.claimedVacationDays = doc.data()?.claimedVacationDays;
    });

    onSnapshot(doc(db, 'newsStore', accountStore.user.id), (doc) => newsStore.news = doc.data()?.news);

    onSnapshot(doc(db, 'preferenceStore', accountStore.user.id), (doc) => preferenceStore.preference = doc.data()?.preference);
}
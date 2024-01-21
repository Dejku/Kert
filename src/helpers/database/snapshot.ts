import { useAccountStore } from 'stores/accountStore';
import { useVacationStore } from 'stores/vacationStore';
import { useNewsStore } from 'src/stores/newsStore';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';

export default function snapshotStart() {
    const accountStore = useAccountStore();
    const vacationStore = useVacationStore();
    const newsStore = useNewsStore();
    const db = getFirestore();

    onSnapshot(doc(db, 'vacationStore', accountStore.user.id), (doc) => {
        vacationStore.overdueVacationDays = doc.data()?.overdueVacationDays;
        vacationStore.numberOfVacationDaysPerYear = doc.data()?.numberOfVacationDaysPerYear;
        vacationStore.availableLimitsForUser['Urlop wypoczynkowy'] = doc.data()?.availableLimitsForUser['Urlop wypoczynkowy'];
        vacationStore.claimedVacationDays = doc.data()?.claimedVacationDays;
    });

    onSnapshot(doc(db, 'newsStore', accountStore.user.id), (doc) => newsStore.news = doc.data()?.news);
}
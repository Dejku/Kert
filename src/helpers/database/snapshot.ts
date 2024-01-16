import { useAccountStore } from 'stores/accountStore';
import { useVacationStore } from 'stores/vacationStore';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';

export default function snapshotStart() {
    const accountStore = useAccountStore()
    const vacationStore = useVacationStore()

    const db = getFirestore();

    onSnapshot(doc(db, 'vacationStore', accountStore.user.id), (doc) => {
        vacationStore.overdueVacationDays = doc.data()?.overdueVacationDays;
        vacationStore.numberOfVacationDaysPerYear = doc.data()?.numberOfVacationDaysPerYear;
        vacationStore.claimedVacationDays = doc.data()?.claimedVacationDays;
    });
}
import { getFunctions, httpsCallable } from 'firebase/functions';
import { signInAnonymously } from 'firebase/auth';
import { auth } from '../firebase';

export const bakeryPaymentsEnabled = process.env.REACT_APP_BAKERY_PAYMENTS_ENABLED === 'true';

export async function callBakeryPayment(name, data) {
    await auth.authStateReady();
    if (!auth.currentUser) await signInAnonymously(auth);
    const call = httpsCallable(getFunctions(auth.app, 'us-central1'), name);
    return (await call(data)).data;
}

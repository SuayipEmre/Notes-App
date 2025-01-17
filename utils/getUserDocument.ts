import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

    
export const getUserDocument = async (user : FirebaseAuthTypes.User | null) => {
    const dbRef = await firestore().collection('Users').doc(user?.uid).get()
    return dbRef
}

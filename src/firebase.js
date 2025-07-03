// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {getFirestore, addDoc, collection} from "firebase/firestore"
import {toast} from "react-toastify";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD1Hx7g2RW92tZcqLahiqPst9rG90NgK20",
    authDomain: "netflix-clone-e70d0.firebaseapp.com",
    projectId: "netflix-clone-e70d0",
    storageBucket: "netflix-clone-e70d0.firebasestorage.app",
    messagingSenderId: "198057391507",
    appId: "1:198057391507:web:759b497ee86dc4f8752466"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (e) {
        console.log(e)
        toast.error(e.code.split('/')[1].split('-').join(" "))
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (e) {
        console.log(e)
        toast.error(e.code.split('/')[1].split('-').join(" "))
    }
}

const logout = () => {
    signOut(auth)
}

export {auth, db, login, signup, logout}
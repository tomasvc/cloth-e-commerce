// import firebase from 'firebase'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, User, signOut } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  QueryDocumentSnapshot
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: "clothing-store-e17ce.appspot.com",
  messagingSenderId: "377376276086",
  appId: "1:377376276086:web:cfc61b8164f55e45452957",
  measurementId: "G-MBNT92V8BT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

const auth = getAuth();
const signInWithGooglePopup = () => signInWithPopup(auth, provider);

type Category = {
  id: number;
  name: string;
};

type UserData = {
  displayName: string;
  email: string;
  createdAt: Date;
  cart: Array<any>;
}

const createUserDocumentFromAuth = async (userAuth: User): Promise<void | QueryDocumentSnapshot<UserData>> => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
        console.log("error creating the user", error);
    }
  }

  return userSnapshot as QueryDocumentSnapshot<UserData>
};

const signOutUser = async () => await signOut(auth)

const getCategories = async (): Promise<
  Category | undefined
> => {
  const docRef = doc(db, "categories", "men");
  const querySnapshot = await getDoc(docRef);

  if (querySnapshot.exists()) {
    return querySnapshot.data().items as Category;
  } else {
    console.log("no such document");
  }
};

const getUserCartFromFirestore = async (userAuth: User): Promise<void | Array<any>> => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const docSnap = await getDoc(userDocRef)

  console.log(docSnap?.data())

  return docSnap?.data()?.cart as Array<any>

}

const getUserFavoritesFromFirestore = async (userAuth: User): Promise<void | Array<any>> => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const docSnap = await getDoc(userDocRef)

  return docSnap?.data()?.favorites as Array<any>

}

const updateUserCart = async (userAuth: User, items: any) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  await updateDoc(userDocRef, {
    cart: items
  }).catch(error => {
    console.error(error)
  })
}

const updateUserFavorites = async (userAuth: User, items: any) => {
  const cleanedItems = items.map((item: any) => {
    const cleanedItem = { ...item };
    Object.keys(cleanedItem).forEach(key => {
      if (cleanedItem[key] === undefined) {
        console.error(`Undefined value found in item at key '${key}':`, item);
        cleanedItem[key] = null;
      }
    });
    return cleanedItem;
  });

  const userDocRef = doc(db, "users", userAuth.uid);

  await updateDoc(userDocRef, {
    favorites: cleanedItems
  }).catch(error => {
    console.error(error)
  })
}

export {
  app,
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signOutUser,
  getCategories,
  updateUserCart,
  updateUserFavorites,
  getUserCartFromFirestore,
  getUserFavoritesFromFirestore
};

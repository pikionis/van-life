// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    doc,
    getDocs,
    getDoc,
    query,
    where,
    documentId
} from "firebase/firestore/lite"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC06OcSqjMiL0aXV1ie1wy2O-CfSteGWZk",
  authDomain: "vanlife-repo.firebaseapp.com",
  projectId: "vanlife-repo",
  storageBucket: "vanlife-repo.firebasestorage.app",
  messagingSenderId: "741785127525",
  appId: "1:741785127525:web:ef7581a56559ce251e948c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)


// import { initializeApp } from "firebase/app"

// const firebaseConfig = {
//     apiKey: "AIzaSyD_k3v3HK3tKEqhlqFHPkwogW7PqEqhGhk",
//     authDomain: "vanlife-a1af5.firebaseapp.com",
//     projectId: "vanlife-a1af5",
//     storageBucket: "vanlife-a1af5.appspot.com",
//     messagingSenderId: "803007000356",
//     appId: "1:803007000356:web:446cd3a1ca406839258db1"
// };


// Refactoring the fetching functions below
const vansCollectionRef = collection(db, "vans")

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}

export async function getHostVans() {
    // This will now fetch from your Mirage JS mock server
    const res = await fetch("/api/host/vans"); // Ensure this matches your Mirage route
    const data = await res.json(); // Data will be { "vans": [...] } from Mirage

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        };
    }

    // Return the nested array from Mirage's response
    return data.vans; // This is the fix we discussed for Mirage's default serializer
}

/* 
This 👇 isn't normally something you'd need to do. Instead, you'd 
set up Firebase security rules so only the currently logged-in user 
could edit their vans.

https://firebase.google.com/docs/rules

I'm just leaving this here for educational purposes, as it took
me a while to find the `documentId()` function that allows you
to use a where() filter on a document's ID property. (Since normally
it only looks at the data() properties of the document, meaning you
can't do `where("id", "==", id))`

It also shows how you can chain together multiple `where` filter calls
*/

// export async function getHostVan(id) {
//     const q = query(
//         vansCollectionRef,
//         where(documentId(), "==", id),
//         where("hostId", "==", "123")
//     )
//     const snapshot = await getDocs(q)
//     const vans = snapshot.docs.map(doc => ({
//         ...doc.data(),
//         id: doc.id
//     }))
//     return vans[0]
// }

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}
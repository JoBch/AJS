import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDduhOi67pkx10tRpuuJbt84t5IoaZme-0",
    authDomain: "scrum-db-joel-bech.firebaseapp.com",
    databaseURL: "https://scrum-db-joel-bech-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "scrum-db-joel-bech",
    storageBucket: "scrum-db-joel-bech.appspot.com",
    messagingSenderId: "715446583596",
    appId: "1:715446583596:web:e004f70de200f54094ac89"
  };

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
const assignmentsRef = ref(db, "/assignments/");
const usersRef = ref(db, "/users/")
const auth = getAuth(firebaseApp);

export { db, assignmentsRef, auth, usersRef };
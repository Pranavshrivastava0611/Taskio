// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc,query,getDocs,where } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6ZUaeYeZaQGLZZBjvZ4wkPsn04MIMhy4",
    authDomain: "mirosecond-ac1bf.firebaseapp.com",
    projectId: "mirosecond-ac1bf",
    storageBucket: "mirosecond-ac1bf.firebasestorage.app",
    messagingSenderId: "238741368688",
    appId: "1:238741368688:web:6a2dcaf2f8bf43ac6269b5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to create a new user
export async function createUser(username: string, password: string) {
  try {
    const docRef = await addDoc(collection(db, "Users"), {
      username: username, // Use the argument value
      password: password, // Use the argument value
    });

    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

export async function getuser(username : string , password : string ) {
    const name  = username ;
    const pass = password ;
    
    try{
    const userCollection = collection(db,"Users");
    const q = query(userCollection, where("username","==",name),where("password","==",pass));
    const querysnapshot = await getDocs(q);

    if (querysnapshot.empty) {
        console.log("No matching user found");
        return null;
    }

    const user = querysnapshot.docs[0];
    console.log(user.data())
}catch(e){
    console.error("error",e)
}




}
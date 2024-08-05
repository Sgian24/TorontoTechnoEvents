import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyATL7VHRGiCpT1VnScMn63A8ptsBIFbqss",
    authDomain: "techno-events-36688.firebaseapp.com",
    projectId: "techno-events-36688",
    storageBucket: "techno-events-36688.appspot.com",
    messagingSenderId: "1019621655054",
    appId: "1:1019621655054:web:ea56f8083cf4d5024bf25f"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
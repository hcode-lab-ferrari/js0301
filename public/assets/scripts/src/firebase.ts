import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD7yOyQtTF5Eq6zL14wJipKZQYantCWN3Y",
  authDomain: "lab-ferrari-jrangel.firebaseapp.com",
  projectId: "lab-ferrari-jrangel",
  storageBucket: "lab-ferrari-jrangel.appspot.com",
  messagingSenderId: "806122170427",
  appId: "1:806122170427:web:1cb16ad2ea95745f7a141e",
  measurementId: "G-GV1F2184S0"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);
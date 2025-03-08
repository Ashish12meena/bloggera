// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB62aZrKlKchhdvIRAM_Hj6LGh8pn6Y32g",
  authDomain: "notification-94cf7.firebaseapp.com",
  projectId: "notification-94cf7",
  storageBucket: "notification-94cf7.firebasestorage.app",
  messagingSenderId: "668745154124",
  appId: "1:668745154124:web:fa2c2e1a701ac53d287ee9",
  measurementId: "G-XLC49CMQX2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const messaging = getMessaging(app);

// Register service worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((registration) => {
        console.log("Service Worker registered:", registration);
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
}
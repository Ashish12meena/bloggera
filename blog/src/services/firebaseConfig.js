// // Import Firebase SDKs
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getMessaging, isSupported } from "firebase/messaging";

// // Firebase Configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyB62aZrKlKchhdvIRAM_Hj6LGh8pn6Y32g",
//   authDomain: "notification-94cf7.firebaseapp.com",
//   projectId: "notification-94cf7",
//   storageBucket: "notification-94cf7.appspot.com",
//   messagingSenderId: "668745154124",
//   appId: "1:668745154124:web:fa2c2e1a701ac53d287ee9",
//   measurementId: "G-XLC49CMQX2"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// // Export messaging using a promise
// export let messagingPromise = isSupported().then((supported) => {
//   if (supported) {
//     console.log("Firebase Messaging is supported.");
//     return getMessaging(app);
//   } else {
//     console.warn("Firebase Messaging is NOT supported in this browser.");
//     return null;
//   }
// }).catch((error) => {
//   console.error("Error checking Firebase Messaging support:", error);
//   return null;
// });

// // Register service worker
// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("/firebase-messaging-sw.js")
//     .then((registration) => {
//       console.log("Service Worker registered:", registration);
//     })
//     .catch((error) => {
//       console.error("Service Worker registration failed:", error);
//     });
// }

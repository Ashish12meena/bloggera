// importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

// // Initialize Firebase inside the Service Worker (without firebaseConfig)
// firebase.initializeApp({
//   apiKey: "AIzaSyB62aZrKlKchhdvIRAM_Hj6LGh8pn6Y32g",
//   authDomain: "notification-94cf7.firebaseapp.com",
//   projectId: "notification-94cf7",
//   storageBucket: "notification-94cf7.firebasestorage.app",
//   messagingSenderId: "668745154124",
//   appId: "1:668745154124:web:fa2c2e1a701ac53d287ee9",
// });

// // Retrieve an instance of Firebase Messaging
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log("Received background message:", payload);

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.image || "/firebase-logo.png", // Add a fallback icon
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });


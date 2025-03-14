// import { getToken, onMessage } from "firebase/messaging";
// import { messaging } from "./firebaseConfig";
// import { saveTokenToBackend } from "./TokenService";

// onMessage(messaging, (payload) => {
  
//     // Display notification manually
//     const { title, body } = payload.notification;
//     new Notification(title, { body, icon: "/firebase-logo.png" });
// });

// export async function requestPermission(userId) {
//   try {
//     // Request permission for notifications
//     const permission = await Notification.requestPermission();

//     if (permission === "granted") {
//       const fcmToken = await getToken(messaging, {
//         vapidKey: "BP57jLcFGqh44Q7baH-c852Iw52Lz_GUwcKF1EdFsYihQOhbwSoQQlmZksYl2ukTJgL7jbdt8SBFoOd08a3Fn-o",
//       });

//       if (fcmToken) {
//         await saveTokenToBackend(userId, fcmToken);
//         return fcmToken; // You can send this token to your backend server
//       } else {

//       }
//     } else {
//       alert("You denied the notification permissio.");
//     }
//   } catch (error) {
//     console.error("Error getting FCM token:", error);
//   }
// }



/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/7.22.1/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/7.22.1/firebase-messaging.js'
);

const config = {
  apiKey: 'AIzaSyDVego6NkWXZR8YRbfPMipgVNi9qaVELJE',
  authDomain: 'tada-truck.firebaseapp.com',
  databaseURL: 'https://tada-truck.firebaseio.com',
  projectId: 'tada-truck',
  storageBucket: 'tada-truck.appspot.com',
  messagingSenderId: '825730442703',
  appId: '1:825730442703:web:a94f921ca763c24e2cdeba',
  measurementId: 'G-2VVGK27T8K',
};
// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp(config);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  // Exit early if we don't get the client.
  // Eg, if it closed.
  // if (!client) return;
  clients
    .matchAll({
      type: 'window',
      includeUncontrolled: true,
    })
    .then((windowClients) =>
      windowClients.map((w) => {
        return w.postMessage(payload);
      })
    );
});

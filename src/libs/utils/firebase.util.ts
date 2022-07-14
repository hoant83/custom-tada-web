import * as firebase from 'firebase/app';
import 'firebase/messaging';

class FireBase {}

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

export const messaging = firebase.messaging.isSupported()
  ? firebase.initializeApp(config).messaging()
  : null;

export default new FireBase();

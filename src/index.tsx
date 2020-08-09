import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase/app';

firebase.initializeApp({
  apiKey: 'AIzaSyBoMGraK2x128WOE2TwsBVa8_dN08xC2dc',
  authDomain: 'ugram-c51b7.firebaseapp.com',
  databaseURL: 'https://ugram-c51b7.firebaseio.com',
  projectId: 'ugram-c51b7',
  storageBucket: 'ugram-c51b7.appspot.com',
  messagingSenderId: '715667012987',
  appId: '1:715667012987:web:278f26ded6bca9244e51de',
  measurementId: 'G-7JHG8ZJL4G',
});
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();

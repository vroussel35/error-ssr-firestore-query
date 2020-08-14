import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {

  private loaded = false;

  constructor() {

    try {

      console.log('Calling singleton FirebaseService...');

      if (!this.loaded) {

        this.loaded = true;

        firebase.setLogLevel('debug');

        firebase.initializeApp({
          apiKey: 'AIzaSyBxBfTbk6h-doGaNLxUxX5TkyqSUBU1TMI',
          appId: '1:559901152914:web:96bdd4dd5d41d47ffb784b',
          authDomain: 'alltrippers-eu.firebaseapp.com',
          databaseURL: 'https://alltrippers-eu.firebaseio.com',
          measurementId: 'G-VH956QF7KN',
          messagingSenderId: '559901152914',
          projectId: 'alltrippers-eu',
          storageBucket: 'alltrippers-eu.appspot.com',
        });

      }

    } catch (error) {
      // console.error(new Date().toLocaleString(), error);
      console.log(new Date().toLocaleString(), 'Firebase already initialized. Skip initialization.');
    }

  }

}

import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import 'firebase/firestore';

// import { AsyncApiCallHelperService } from './async-api-call-helper.service';

@Injectable({
    providedIn: 'root',
})
export class FirebaseService {

    // app: firebase.app.App;
    public loaded: boolean;

    constructor(
      // private processor: AsyncApiCallHelperService
    ) {

      console.log('in constructor FirebaseService');

      if (this.loaded !== true) {

        this.loaded = true;

        firebase.initializeApp({
          apiKey: 'AIzaSyBxBfTbk6h-doGaNLxUxX5TkyqSUBU1TMI',
          authDomain: 'alltrippers-eu.firebaseapp.com',
          databaseURL: 'https://alltrippers-eu.firebaseio.com',
          projectId: 'alltrippers-eu',
          storageBucket: 'alltrippers-eu.appspot.com',
          messagingSenderId: '559901152914',
          appId: '1:559901152914:web:96bdd4dd5d41d47ffb784b',
          measurementId: 'G-VH956QF7KN',
        });

      }

    }

    public execute() {
      return firebase.firestore().collection('homepages_public').doc('32a7hGeVfgwJ0v2eEBw3').get();
    }
}

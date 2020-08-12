import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';
import 'firebase/firestore';

import { FirebaseService } from './firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(
    private firebaseService: FirebaseService
  ) {}

  public ngOnInit() {

    firebase.firestore().collection('homepages_public').doc('32a7hGeVfgwJ0v2eEBw3').get().then((result) => {
      console.log(result.id);
    });

  }

}

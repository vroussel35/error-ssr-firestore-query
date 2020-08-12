import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { isPlatformBrowser } from '@angular/common';
import { APP_ID, Inject, PLATFORM_ID } from '@angular/core';

import * as firebase from 'firebase';
import 'firebase/firestore';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'error-ssr-firestore' }),
    FormsModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {

  public loaded: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);

  }
}

import {Component, OnInit} from '@angular/core';
// import { disableDeprecatedForms, provideForms } from '@angular/forms';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {ListingPage} from './pages/listing/listing';
import {LoginPage} from './pages/login/login';
import {Auth} from './services/auth';

@Component({
  templateUrl: 'build/pages/app/app.html'
})
export class MyApp implements OnInit {

  private rootPage:any;

  ngOnInit() {}

  constructor(private platform: Platform, private auth: Auth) {
    auth.getCurrentUser().then(() => {
      this.rootPage = ListingPage;
    }, (err) => {
      console.warn(err);
      this.rootPage = LoginPage;
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      navigator.splashscreen.hide();
      StatusBar.styleDefault();
    });
  }
}

// ionicBootstrap(MyApp, [
//   disableDeprecatedForms(),
//   provideForms(),
//   Auth
// ])
ionicBootstrap(MyApp, [Auth])

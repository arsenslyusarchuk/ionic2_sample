import {Component} from '@angular/core';
import {Modal, NavController,ViewController} from 'ionic-angular';

@Component({  
  templateUrl: 'build/components/forgot-password/forgot-password-component.html'
})
export class ForgotPasswordComponent{
  constructor(
    private viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss();
  }
}

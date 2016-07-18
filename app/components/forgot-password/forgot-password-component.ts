import { Component } from '@angular/core';
import { Modal, NavController,ViewController, Loading } from 'ionic-angular';
import { FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl } from '@angular/common';
import { CustomValidators } from '../../validators/custom-validators';
import { UserService } from '../../services/user-service';

@Component({
  templateUrl: 'build/components/forgot-password/forgot-password-component.html',
  providers: [UserService],
  directives: [FORM_DIRECTIVES]
})
export class ForgotPasswordComponent{
  forgotPasswordForm: ControlGroup;
  email: AbstractControl;

  constructor(
      private _viewCtrl: ViewController,
      private fb: FormBuilder,
      private _navController: NavController,
      private _userService: UserService ) {

      this.forgotPasswordForm = fb.group({
         'email': ['', Validators.compose([Validators.required, Validators.minLength(8), CustomValidators.EmailValidator])],
      });

      this.email = this.forgotPasswordForm.controls['email'];
  }

  onSubmit(value: string): void {
    if(this.forgotPasswordForm.valid) {
      console.log('Submitted value: ', value);
      let loading = Loading.create({
        content: "Please wait..."
      });
      this._navController.present(loading);
      this._userService.forgotPassword(value)
        .then((data) => {
          this._viewCtrl.dismiss();
          setTimeout(() => {loading.dismiss();}, 100);
          console.log('reset Password sent, response is',  data);
        });
    }
  }

  close() {
    this._viewCtrl.dismiss();
  }
}

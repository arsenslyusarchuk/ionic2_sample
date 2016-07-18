import { Component, OnInit } from '@angular/core'
// import { NgForm }  from '@angular/forms';
import { NavController, Loading, ActionSheet, Modal } from 'ionic-angular';
import {FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl} from '@angular/common';
import { User } from '../../models/user';
import { Auth } from '../../services/auth';
import { ListingPage } from '../../pages/listing/listing';
import { CustomValidators } from '../../validators/custom-validators';
import { ForgotPasswordComponent } from '../../components/forgot-password/forgot-password-component';


@Component({
  templateUrl: 'build/pages/login/login.html',
  directives: [FORM_DIRECTIVES]
})
export class LoginPage implements OnInit  {
  loadingContent: boolean;

  model = new User(18, "My name", "my password");

  // submitted = false;

  // onSubmit() { this.submitted = true; }

  // constructor()  {}

  ngOnInit() {}

  // get diagnostic() { return JSON.stringify(this.model); }

  loginForm: ControlGroup;
  username: AbstractControl;
  password: AbstractControl;

  constructor(
    private _navController: NavController,
    private fb: FormBuilder,
    private _authService: Auth
    ) {
    this.loginForm = fb.group({
        'username': ['', Validators.compose([Validators.required, Validators.minLength(8), CustomValidators.EmailValidator])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });

    this.username = this.loginForm.controls['username'];
    this.password = this.loginForm.controls['password'];
  }

  onSubmit(value: string): void {
    if(this.loginForm.valid) {
      console.log('Submitted value: ', value);
      let loading = Loading.create({
        content: "Please wait...",
        dismissOnPageChange: true
      });
      this._navController.present(loading);
      this._authService.login(value)
        .then((data) => {
          this.loadingContent = false;
          this._authService.setCurrentUser(data).then(() => {
            console.log('current User is',  this._authService.currentUser);
            loading.dismiss();
            this._navController.setRoot(ListingPage);
          });
        });
    }
  }

  showModal(event) {
    let modal = Modal.create(ForgotPasswordComponent, {}, {enableBackdropDismiss: false});
    this._navController.present(modal);
  }
}

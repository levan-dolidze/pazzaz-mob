import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { Field } from '../shared/classes';
import { SharedService } from '../shared/shared.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  field: Field = new Field();
  recapture: any;
  enterOtp:boolean;
  constructor(private firebaseAuth: FirebaseAuthService,
    private router: Router,
    private shared: SharedService
  ) { this.enterOtp=false
  
  }


  ngOnInit() {
    
    this.recapture = new firebase.auth.RecaptchaVerifier('login-btn', {
      size: 'invisible',
      callback: (response) => {

      },
      'expired-callback': () => {
      }
    });
  }


  async userLogin(form) {
    if (form.invalid) {
      return
    }
    else {
      await this.firebaseAuth.signIn(this.field.username, this.field.password);
      this.router.navigate(['/tabs/home'])
      this.shared.authStatusChange.next();

    }

  }

  async loginOTP(form) {
    if (form.invalid) {
      return
    } else {
     this.enterOtp=true;
      await this.firebaseAuth.loginWithOTP(this.field.mobile, this.recapture);
    }

  }

  async confirm() {
    await this.firebaseAuth.enterVerificationCode(this.field.otp)
    this.field.otp=null;
  }


}

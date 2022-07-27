import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(private firebaseAuth: AngularFireAuth,
    private router: Router, private shared: SharedService) { }
  confirmationResult: any;
  async signUp(email: string, password: string) {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password).
      then(res => {
        localStorage.setItem('user', JSON.stringify(res.user))
      })
  };


  async signIn(email: string, password: string) {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password).
      then(res => {
        localStorage.setItem('user', JSON.stringify(res.user))
      })
  };

  async logOut() {
    this.firebaseAuth.signOut();
    localStorage.clear()
    // localStorage.removeItem('user');

  };


  async loginWithOTP(mob, btn) {
    const result = await this.firebaseAuth.signInWithPhoneNumber(mob, btn);
    this.confirmationResult = result;
  }


  async enterVerificationCode(code) {
    const res = await this.confirmationResult.confirm(code);
    if (res.user) {
      localStorage.setItem('user', JSON.stringify(res.user));
      this.router.navigate(['/tabs/home'])
      this.shared.authStatusChange.next();

    } else {

    }
  }













  async resetPassword(email) {
    await this.firebaseAuth.sendPasswordResetEmail(email).then(res => {

    })

  }
}

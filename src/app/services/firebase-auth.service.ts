import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(private firebaseAuth: AngularFireAuth) {  }
  
  confirmationResult:any;
  
 
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


  async loginWithOTP(mob,btn){
const confir= await this.firebaseAuth.signInWithPhoneNumber(mob,btn).then(res=>{
  this.confirmationResult=confir
  
  })

  }


  async enterVerificationCode(code) {
 const result= await this.confirmationResult.confirm(code).then((result) => {
      console.log(result)

      console.log(result)
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
    });
  }













  async resetPassword(email) {
    await this.firebaseAuth.sendPasswordResetEmail(email).then(res => {

    })

  }
}

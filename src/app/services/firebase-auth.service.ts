import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(private firebaseAuth: AngularFireAuth) { }


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
}

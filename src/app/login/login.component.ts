import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { Field } from '../shared/classes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  field: Field = new Field();
  constructor(private firebaseAuth: FirebaseAuthService,
    private router: Router
  ) { }

  ngOnInit() { }


  async userLogin(form) {
    if (form.invalid) {
      return
    }
    else {
      await this.firebaseAuth.signIn(this.field.username, this.field.password);
      this.router.navigate(['/tabs/tab1'])
      // window.location.reload();

    }

  }



  forgetPass() {


  }



}

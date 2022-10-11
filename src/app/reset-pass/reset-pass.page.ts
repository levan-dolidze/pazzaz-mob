import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { Field } from '../shared/classes';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.page.html',
  styleUrls: ['./reset-pass.page.scss'],
})
export class ResetPassPage implements OnInit {

  constructor(private firebaseAuth:FirebaseAuthService) { }
  field: Field = new Field();

  ngOnInit() {
  };

 async resetPass(email) {
    if(email.invalid){
      return 
    }else{
      await this.firebaseAuth.resetPassword(this.field.username)
    }
  };



}

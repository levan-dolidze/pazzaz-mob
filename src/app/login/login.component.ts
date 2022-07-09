import { Component, OnInit } from '@angular/core';
import { Field } from '../shared/classes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  field: Field = new Field();
  constructor() { }

  ngOnInit() { }

  forgetPass() {


  }
  userLogin(form) {
    if (form.invalid){
      return 
    }
    else{
      
    }

  }
}

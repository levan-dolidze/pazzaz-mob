import { Component, OnInit } from '@angular/core';
import { Field } from '../shared/classes';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.page.html',
  styleUrls: ['./reset-pass.page.scss'],
})
export class ResetPassPage implements OnInit {

  constructor() { }
  field: Field = new Field();

  ngOnInit() {
  }

  resetPassword(email) {

  }


}

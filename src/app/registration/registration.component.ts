import { Component, OnInit } from '@angular/core';
import { Registr } from '../shared/classes';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {

  constructor() { }

  field: Registr = new Registr();
  ngOnInit() { }

  registration(form) {

  }

}

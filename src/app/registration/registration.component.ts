import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { Registr } from '../shared/classes';
import { ToastController } from '@ionic/angular';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {

  constructor(private firebaseAuth: FirebaseAuthService,
    private router: Router,
    private alertController: AlertController,
    public toastController: ToastController,
    private shared:SharedService

  ) { }

  field: Registr = new Registr();
  welcome: boolean = false;
  ngOnInit() {
  }




  async signUp(form: any) {
    if (form.invalid) {
      return
    } else {
      await this.firebaseAuth.signUp(this.field.username, this.field.password);
      this.welcome = true;
      setTimeout(() => {
        this.userLogin();

      }, 3000);
    }

  };


  async userLogin() {
      await this.firebaseAuth.signIn(this.field.username, this.field.password);
      this.shared.authStatusChange.next();
      this.welcome=false;
      this.router.navigate(['tabs/tab1'])
  
    }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'WELCOME TO PAZAZZ',
      duration: 2500
    });

    toast.present();
  };


};




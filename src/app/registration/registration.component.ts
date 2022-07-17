import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { Registr } from '../shared/classes';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {

  constructor(private firebaseAuth: FirebaseAuthService,
    private router: Router,
    private alertController: AlertController,
    public toastController: ToastController

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
      // this.presentToast();
      setTimeout(() => {
        this.router.navigate(['/tabs/tab1'])
        this.welcome! = this.welcome;


      }, 3000);

      // 

      // if (this.firebase.isLoggedIn) this.authServise.userIsLogedin.next(true)
      // this.verifyEmail();
    }

  };


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'WELCOME TO PAZAZZ',
      duration: 2500
    });

    toast.present();
  }


}




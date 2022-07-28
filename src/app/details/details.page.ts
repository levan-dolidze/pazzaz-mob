import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { from, Observable, of } from 'rxjs';
import { filter, toArray } from 'rxjs/operators';
import { HttpService } from '../services/http.service';
import { ProductModel } from '../shared/models';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  constructor(private router: ActivatedRoute,
    private http: HttpService,
    private alertController: AlertController,
    private shared: SharedService,
    private rout: Router,
    public toastController: ToastController) { }
    selectedItemArr$: Observable<ProductModel[]>;

  ngOnInit() {
    const id = this.router.snapshot.paramMap.get('id');
    this.returnSelectedItem(id)
  };

  returnSelectedItem(id: any) {
    this.selectedItemArr$ = this.http.getProducts();
    this.selectedItemArr$.subscribe((res) => {
      from(res).pipe(
        filter((x => x.itemId == id)),
        toArray()
      ).subscribe((res) => {
        this.selectedItemArr$ = of(res)

      })
    })
  };


  
  subscribe() {
    this.shared.userAuthChecking().subscribe((res) => {
      if (res) {
        this.presentToast()
        this.selectedItemArr$.subscribe((res)=>{
          this.http.addSubscribtion(res).subscribe();
        })
        setTimeout(() => {
          this.rout.navigate(['/tabs/home'])
        }, 3000);
      } else {
        this.rout.navigate(['/tabs/login'])
      }
    })
  };




  async presentToast() {
    const toast = await this.toastController.create({
      message: 'THANK YOU FOR SUBSCRIBTION',
      duration: 2500,
      color:'success',
      icon:'checkmark-done-outline'

    });

    toast.present();
  }


  async buscribtionMessage() {
    const alert = await this.alertController.create({
      header: 'Great !',
      subHeader: 'subscribtion has done',
      message: 'you`ll recive low price notification on the item ',
      buttons: ['OK']
    });

    await alert.present();
  }

};

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { from, Observable, of } from 'rxjs';
import { HttpService } from '../services/http.service';
import { ProductModel } from '../shared/models';
import { SharedService } from '../shared/shared.service';
import { filter, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss'],
})
export class ViewDetailsComponent implements OnInit {

  constructor(private router: ActivatedRoute,
    private http: HttpService,
    private alertController: AlertController,
    private shared: SharedService,
    private rout: Router,
    public toastController: ToastController

  ) { }

  selectedItemArr$: Observable<ProductModel[]>;
  ngOnInit() {
    const id = this.router.snapshot.paramMap.get('id');
    this.returnSelectedItem(id)
  }

  returnSelectedItem(id: any) {
    this.selectedItemArr$ = this.http.getProducts();
    this.selectedItemArr$.subscribe((res) => {
      from(res).pipe(
        filter((x => x.itemId == id)),
        toArray()
      ).subscribe((res) => {
        console.log(res)
        this.selectedItemArr$ = of(res)

      })
    })
  };

  subscribe() {
    // let inString = JSON.stringify(this.selectedItemArr$);
    // localStorage.setItem('subscribedItems', inString);
    this.shared.userAuthCheckong().subscribe((res) => {
      if (res) {
        this.presentToast()
        this.selectedItemArr$.subscribe((res)=>{
          this.http.addSubscribtion(res).subscribe()
        })
        setTimeout(() => {
          this.rout.navigate(['/tabs/tab1'])
        }, 3000);
      } else {
        this.rout.navigate(['/tabs/login'])
      }
    })
  };

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'THANK YOU FOR SUBSCRIBTION',
      duration: 2500
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

}

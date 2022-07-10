import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { from } from 'rxjs';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss'],
})
export class ViewDetailsComponent implements OnInit {

  constructor(private router: ActivatedRoute,
    private http: HttpService,
    private alertController: AlertController
  ) { }

  selectedItemArr: any;
  ngOnInit() {

    const id = this.router.snapshot.paramMap.get('id');
    this.returnSelectedItem(id)
  }

  returnSelectedItem(id: any) {
    this.http.getProducts().subscribe((res) => {
      const filt = res.filter((item) => {
        return item.itemId == id
      })
      this.selectedItemArr = filt
    })
  };

  subscribe() {
    let inString = JSON.stringify(this.selectedItemArr);
    localStorage.setItem('subscribedItems', inString);
    this.buscribtionMessage();
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

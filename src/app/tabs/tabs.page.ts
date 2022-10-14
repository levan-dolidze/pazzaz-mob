import { Component, OnInit } from '@angular/core';
import { forkJoin, from } from 'rxjs';
import { filter } from 'rxjs/operators';
import { HttpService } from '../services/http.service';
import { ProductModel } from '../shared/models';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  notifications: number;
  array: Array<ProductModel> = [];

  constructor(private http: HttpService) {

  }

  ngOnInit() {
    this.returnNotifications();
  };

  returnNotifications() {
    forkJoin({
      requestOne: this.http.getProducts(),
      requestTwo: this.http.getSubscribtionItems()
    }).subscribe((res) => {
      let result = res.requestOne.filter(x1 => res.requestTwo.every(x2 => x1.newPrice !== x2.newPrice));
      const maped = result.map((item) => {
        return item.newPrice
      })
      if (maped.length > 0) {
        this.notifications = maped.length
      }
      return
    })
  }


};

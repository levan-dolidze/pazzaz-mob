import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { HttpService } from '../services/http.service';
import { ProductModel } from '../shared/models';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  subscribedItems$: Observable<ProductModel[]>
  constructor(private shared: SharedService,
    private http: HttpService
  ) { }


  ngOnInit() {
    this.returnNotifications();
    this.shared.notificationEvent.subscribe((res) => {
      this.subscribedItems$ = of(res)
    })
  };

  returnNotifications() {
    forkJoin({
      requestOne: this.http.getProducts(),
      requestTwo: this.http.getSubscribtionItems()
    }).subscribe((res) => {
      let result = res.requestOne.filter(x1 => res.requestTwo.every(x2 => x1.newPrice !== x2.newPrice));
      this.subscribedItems$ = of(result)
    })
  };

};

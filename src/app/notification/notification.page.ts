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
  userUID: any;

  constructor(private shared: SharedService,
    private http: HttpService
  ) { }


  ngOnInit() {
    // this.returnNotifications();

    this.refreshControl()





  };

  refreshControl() {
    this.shared.notificationEvent.subscribe((res) => {
      this.subscribedItems$ = of(res)

    })


  }

  // returnNotifications() {
  //   forkJoin({
  //     local: this.http.getProducts(),
  //     base: this.http.getSubscribtionItems()
  //   }).subscribe((res) => {
  //     if (res.base.length > 0) {
  //       localStorage.setItem('data', JSON.stringify(res.base))
  //     }
  //   })

  // };



};

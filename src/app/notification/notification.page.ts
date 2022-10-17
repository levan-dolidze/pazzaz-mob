import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Observable, of, Subscription } from 'rxjs';
import { HttpService } from '../services/http.service';
import { ProductModel } from '../shared/models';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit, OnDestroy {
  subscribedItems$: Observable<ProductModel[]>
  userUID: any;
  unSubscribe$ = new Subscription;

  constructor(private shared: SharedService,
    private http: HttpService
  ) { }


  ngOnInit() {
    // this.returnNotifications();

    this.refreshControl()





  };

  refreshControl() {
    //ამას მოაქვს ლოკალ სტორიჯიდან დატა დამახსოვრებული და შეცვლილი
    this.shared.userAuthChecking().subscribe((res) => {
      if (res) {
        const dat = localStorage.getItem('data')
        const data = JSON.parse(dat)
        this.subscribedItems$ = of(data)
      }
      return

    })


    //ეს მოდის ტაბს კომპონენტიდან
    // this.unSubscribe$ = this.shared.notificationEvent.subscribe((res) => {
    //   this.subscribedItems$ = of(res)

    // })


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

  ngOnDestroy(): void {
    this.unSubscribe$.unsubscribe();
    console.log('unsubs')
  }


};

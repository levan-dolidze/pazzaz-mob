import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Observable, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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
  ) { }


  ngOnInit() {
    this.refreshControl();
    this.shared.logOutEvent.subscribe((res)=>{
      this.subscribedItems$=of([])

    })
  };

  refreshControl() {
    forkJoin({
      urerData: this.shared.returnAuthModel(),
      authCheck: this.shared.userAuthChecking()
    }).subscribe((res) => {
      const dataStorage = localStorage.getItem('data')
      if (res.authCheck && dataStorage) {
        const data = JSON.parse(dataStorage)
        const filtredNotidications = data.filter((item) => {
          return item.userUID === res.urerData.uid
        })
        this.subscribedItems$ = of(filtredNotidications)
      }
      else{
        this.subscribedItems$ =of([])
      }
    })



    //ეს მოდის ტაბს კომპონენტიდან
    // this.unSubscribe$ = this.shared.notificationEvent.subscribe((res) => {
    //   this.subscribedItems$ = of(res)

    // })
  }


  ngOnDestroy(): void {
    this.unSubscribe$.unsubscribe();
  };


};

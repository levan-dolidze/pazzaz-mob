import { Component, OnInit } from '@angular/core';
import { forkJoin, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpService } from '../services/http.service';
import { ProductModel } from '../shared/models';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  notifications: number;
  array: Array<ProductModel> = [];

  constructor(private http: HttpService,
    private shared: SharedService

  ) {

  }

  ngOnInit() {
    this.refreshControl();

  };

  refreshControl() {
    interval(60000).pipe(
      switchMap(x => forkJoin({
        base: this.http.getSubscribtionItems()
      }))
    ).subscribe((res) => {
      let storedData = localStorage.getItem('data');
      if (storedData) {
        let storedDataParsed: ProductModel[] = JSON.parse(storedData);
        //vcvli fass xelovnurad
        storedDataParsed[0].newPrice = 75
        let result = res.base.filter(x1 => storedDataParsed.every(x2 => x1.newPrice !== x2.newPrice));
        if (result.length === 0) {
          return
        }
        else {
          result[0].oldPrice = storedDataParsed[0].newPrice
          this.notifications = result.length
          this.shared.notificationEvent.next(result)
          localStorage.setItem('data', JSON.stringify(result))
        }
      }
      else {
        return
      }
    })
  }



};

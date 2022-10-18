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
  isUserLogin: boolean;

  constructor(private http: HttpService,
    private shared: SharedService

  ) {

  }

  ngOnInit() {
    let storedData = localStorage.getItem('data');
    if (storedData) {
      const d = JSON.parse(storedData)
      this.notifications = d.length
    }
    // this.refreshControl();
    this.shared.logOutEvent.subscribe(() => {
      this.notifications = null;
    })

  };

  changePrise() {
    let storedData = localStorage.getItem('data');
    let storedDataParsed: ProductModel[] = JSON.parse(storedData);
    storedDataParsed[0].newPrice = 75;
    localStorage.setItem('data', JSON.stringify(storedDataParsed))
    this.refreshControl();
  }
  refreshControl() {
    forkJoin({
      base: this.http.getSubscribtionItems()
    }
    ).subscribe((res) => {
      let storedData = localStorage.getItem('data');
      if (storedData) {
        let storedDataParsed: ProductModel[] = JSON.parse(storedData);
        //vcvli fass xelovnurad

        let result = res.base.filter(x1 => storedDataParsed.every(x2 => x1.newPrice !== x2.newPrice));
        this.notifications = result.length
        if (result.length === 0) {
          return
        }
        else {
          result[0].oldPrice = storedDataParsed[0].newPrice
          this.shared.notificationEvent.next(result)
          localStorage.setItem('data', JSON.stringify(result))
        }
      }
      else {
        return
      }
    })
  };



};

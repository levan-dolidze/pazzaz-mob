import { Component, OnInit } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { HttpService } from '../services/http.service';
import { ProductModel } from '../shared/models';
import { SharedService } from '../shared/shared.service';
import { filter, toArray, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-my-subscribtion',
  templateUrl: './my-subscribtion.component.html',
  styleUrls: ['./my-subscribtion.component.scss'],
})
export class MySubscribtionComponent implements OnInit {

  subscribedItems$: Observable<ProductModel>
  items$: Array<ProductModel> = [];
  parsedItemData: Array<ProductModel> = []

  userUID: any
  constructor(private http: HttpService,
    private shared: SharedService,

  ) { }


  ngOnInit() {
    this.returnSubscribedItems()
  };

  returnSubscribedItems() {
    this.subscribedItems$ = this.http.getSubscribtionItems();
    this.subscribedItems$.subscribe((res) => {
      if (res) {
        let itemDataAll = Object.values(res);
        for (let i = 0; i < itemDataAll.length; i++) {
          if (itemDataAll[i][0]) {
            this.parsedItemData.push(itemDataAll[i][0])
          }
          this.shared.returnAuthModel().subscribe((res) => {
            if (res) {
              this.userUID = res;
              from(this.parsedItemData).pipe(
                filter((x => x.userUID == this.userUID.uid)),
                toArray()
              ).subscribe((res) => {
                this.items$ = res
              })
            }
            return
          })
        }
      }
      return
    })
  };

};
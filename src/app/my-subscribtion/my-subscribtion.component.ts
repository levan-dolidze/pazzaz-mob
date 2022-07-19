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
  items$:Array<ProductModel> =[];
  arr: Array<any> = []
  constructor(private http: HttpService,
    private shared: SharedService,

  ) { }


  ngOnInit() {
    this.returnSubscribedItems()

  }

  returnSubscribedItems() {
    this.subscribedItems$ = this.http.getSubscribtionItems();
    this.subscribedItems$.subscribe((res) => {
        let kk=Object.values(res);
      for (let index = 0; index < kk.length; index++) {
       this.items$.push(kk[index][0]) 

      }
      // this.arr.push(res)
      // console.log(this.arr)

    })

  }

}

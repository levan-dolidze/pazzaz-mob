import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInfiniteScroll, MenuController } from '@ionic/angular';
import { from, Observable, of } from 'rxjs';
import { filter, shareReplay, toArray } from 'rxjs/operators';
import { HttpService } from '../services/http.service';
import { Field } from '../shared/classes';
import { ProductModel } from '../shared/models';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private menu: MenuController,
    private http: HttpService,
    private router: ActivatedRoute,
    private shared: SharedService
  ) {


  }
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;
  products$: Observable<ProductModel[]>
  items$: Observable<ProductModel[]>;

  field: Field = new Field();
  itemLength: any = 6;


  ngOnInit(): void {
    this.producstOnUI();
    this.field.search = '';
  };
  returnProducts() {
    this.items$ = this.http.getProducts().pipe();
    shareReplay()
  };


  producstOnUI() {
    this.returnProducts();
    this.items$.subscribe((res) => {
      this.products$ = of(res.slice(0, this.itemLength))
    })
  };

  doInfinite(infiniteScroll) {
    this.itemLength += 6;
    this.producstOnUI();
    setTimeout(() => {
      this.infiniteScroll.complete();
    }, 500);
  }



  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  };

  openEnd() {
    this.menu.open('end');
  };

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  };

  filtering() {
    this.items$.subscribe((res) => {
      this.products$ = of(res)
    })
  }

  search(form) {
    if (form.invalid) {
      return
    }
    else {
      this.items$.subscribe((res) => {
        from(res).pipe(
          filter((x => x.itemName === this.field.search)),
          toArray()
        ).subscribe((res) => {
          this.products$ = of(res)
        })
      })
    };
  };

};

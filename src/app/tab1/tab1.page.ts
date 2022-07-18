import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInfiniteScroll, MenuController } from '@ionic/angular';
import { HttpService } from '../services/http.service';
import { Field } from '../shared/classes';
import { ProductModel } from '../shared/models';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private menu: MenuController,
    private http: HttpService, private router: ActivatedRoute) {


  }
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;
  products:ProductModel[];

  field: Field = new Field();
  itemLength: any = 6;
  
  doInfinite(infiniteScroll) {
    this.itemLength += 6
    this.returnProducts();
    setTimeout(() => {
      this.infiniteScroll.complete();
    }, 500);
  }





  ngOnInit(): void {
    this.field.search = '';
    this.returnProducts();

  }
  returnProducts() {
    this.http.getProducts().subscribe((res) => {
      let items = res;
      this.products = items.slice(0, this.itemLength);
    })








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


  search(form) {
    if (form.invalid) {
      return
    }
    else {
      console.log(form)
    };
  };

};

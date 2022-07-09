import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { HttpService } from '../services/http.service';
import { ProductModel } from '../shared/models';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private menu: MenuController,
    private http: HttpService) { }

  products: ProductModel[]

  ngOnInit(): void {
    this.returnProducts();

  }
  returnProducts() {
    this.http.getProducts().subscribe((res) => {
      this.products = res;
    })

  }


  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }






}

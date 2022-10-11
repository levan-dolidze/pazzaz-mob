import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(private shared: SharedService) {

  }
  subscribtionQTY: number = 0;

  ngOnInit() {
    this.returnSubscriptionQTY()

    this.shared.itemQTYEvent.subscribe(() => {
      this.returnSubscriptionQTY()
    })
  }

  returnSubscriptionQTY() {
    let subQTY = localStorage.getItem('subscribtionQTY');
    if (subQTY) {
      this.subscribtionQTY = JSON.parse(subQTY)
    }
    return
  }

};

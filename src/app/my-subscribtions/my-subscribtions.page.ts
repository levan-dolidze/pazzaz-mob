import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { from, Observable } from 'rxjs';
import { filter, toArray } from 'rxjs/operators';
import { HttpService } from '../services/http.service';
import { ProductModel } from '../shared/models';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-my-subscribtions',
  templateUrl: './my-subscribtions.page.html',
  styleUrls: ['./my-subscribtions.page.scss'],
})
export class MySubscribtionsPage implements OnInit {

  constructor(private http: HttpService,
    public actionSheetController: ActionSheetController,
    private shared: SharedService,) { }

  subscribedItems$: Observable<ProductModel>
  items$: Array<ProductModel> = [];
  parsedItemData: Array<ProductModel> = [];
  userUID: any;


  ngOnInit() {
    this.returnSubscribedItems();

  };
  refresh(event) {
    window.location.reload()
  }

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


  deleteSubscribtion(itemId?: any) {
    this.items$.splice(itemId, 1)
    this.http.deleteSubscribedItem(itemId).subscribe(() => {

    })
  };


  async presentActionSheet(i) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Delete',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        id: 'delete-button',
        data: {
          type: 'delete'
        },
        handler: () => {
          console.log('Delete clicked');
        }

      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
    if (data?.type == 'delete') {
      this.deleteSubscribtion();
    };
  };


};

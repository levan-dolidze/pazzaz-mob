import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
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
    private shared: SharedService) { }

  subscribedItems$: Observable<ProductModel[]>
  items$: Array<ProductModel> = [];
  parsedItemData: Array<ProductModel> = [];
  userUID: any;
  subscribtionQTY: number = 0;


  ngOnInit() {
    this.returnSubscribedItems();
    this.shared.itemQTYEvent.subscribe(()=>{
      this.subscribedItems$.subscribe((res) => {
        this.subscribtionQTY = res.length
        this.subscribedItems$=of(res)
  
      })

    })

  };










  refresh() {
    window.location.reload()
  }

  returnSubscribedItems() {
    this.subscribedItems$ = this.http.getSubscribtionItems();
    this.subscribedItems$.subscribe((res) => {
      this.subscribtionQTY = res.length

    })
    // this.subscribedItems$.subscribe((res) => {
    //   console.log(res)
    //   if (res) {
    //     let itemDataAll = Object.values(res);
    //     for (let i = 0; i < itemDataAll.length; i++) {
    //       if (itemDataAll[i][0]) {
    //         this.parsedItemData.push(itemDataAll[i][0])
    //       }
    //       this.shared.returnAuthModel().subscribe((res) => {
    //         if (res) {
    //           this.userUID = res;
    //           from(this.parsedItemData).pipe(
    //             filter((x => x.userUID == this.userUID.uid)),
    //             toArray()
    //           ).subscribe((res) => {
    //             this.items$ = res
    //           })
    //         }
    //         return
    //       })
    //     }
    //   }
    //   return
    // })
  };


  deleteSubscribtion(key: any) {
    this.http.deleteSubscribedItem(key).subscribe(() => {
      //გასაკეთებელია წაშლაზე ივენთი გავისროლო და განვაახლო საბსკრიბშენის რაოდენობა
      this.shared.itemQTYEvent.next()
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
      this.deleteSubscribtion(i)
    };
  };


};

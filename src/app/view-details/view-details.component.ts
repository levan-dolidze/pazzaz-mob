import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss'],
})
export class ViewDetailsComponent implements OnInit {

  constructor(private router: ActivatedRoute, private http: HttpService) { }

  selectedItemArr:any;
  ngOnInit() {

    const id = this.router.snapshot.paramMap.get('id');
   this.returnSelectedItem(id)
  }

  returnSelectedItem(id:any) {
    this.http.getProducts().subscribe((res) => {
      const filt = res.filter((item) => {
        console.log(item.itemId)
        console.log(id)
        return item.itemId == id
      })
      this.selectedItemArr=filt
    })


  };

  subscribe(){
    
  }

}
